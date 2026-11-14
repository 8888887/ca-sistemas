import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { launchBrowser } from './browser.mjs';

const browser = await launchBrowser();
const origin = process.env.UI_ORIGIN || 'http://127.0.0.1:4200';
const errors = [];
const layouts = [];
const waitFor = async expression => {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if (await browser.evaluate(expression)) return;
    } catch (error) {
      if (!/navigated|Cannot find context|Execution context was destroyed/.test(error.message)) throw error;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`Timed out: ${expression}`);
};
const resize = async width => {
  await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
};
const navigate = async route => {
  const previous = await browser.evaluate('window.motionDocumentId');
  await browser.page('Page.navigate', { url: origin + route });
  await waitFor(`typeof window.motionDocumentId === 'string' && window.motionDocumentId !== ${JSON.stringify(previous)} && !!document.querySelector('main .reveal-ready')`);
};
const reloadAbout = async () => {
  const previous = await browser.evaluate('window.motionDocumentId');
  await browser.page('Page.reload');
  await waitFor(`typeof window.motionDocumentId === 'string' && window.motionDocumentId !== ${JSON.stringify(previous)} && !!document.querySelector('app-nosotros #about-title')`);
};
browser.onEvent(event => {
  if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails.text);
  if (event.method === 'Network.responseReceived' && event.params.response.status >= 400) errors.push(event.params.response.url);
});
try {
  await browser.page('Page.enable');
  await browser.page('Runtime.enable');
  await browser.page('Network.enable');
  await browser.page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await browser.page('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.motionDocumentId = Math.random().toString(36);
    window.motionSamples = [];
    document.addEventListener('transitionrun', event => {
      if (event.propertyName !== 'translate' || !event.target.classList.contains('reveal-visible')) return;
      const style = getComputedStyle(event.target);
      window.motionSamples.push({ side: event.target.classList.contains('reveal-from-right') ? 'right' : 'left', offset: parseFloat(style.translate), opacity: parseFloat(style.opacity) });
    });
  ` });
  await resize(1366);
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 540, deviceScaleFactor: 1, mobile: false });
  await navigate('/');
  await waitFor(`window.motionSamples?.some(sample => sample.side === 'left' && sample.offset < -1) && window.motionSamples?.some(sample => sample.side === 'right' && sample.offset > 1)`);
  const entrance = await browser.evaluate('window.motionSamples');
  await waitFor(`getComputedStyle(document.querySelector('app-home-hero .hero-copy')).opacity === '1' && parseFloat(getComputedStyle(document.querySelector('app-home-hero .hero-visual')).translate) === 0`);
  assert.equal(await browser.evaluate(`document.querySelector('app-home-contact app-contact-form').classList.contains('reveal-visible')`), false);
  await browser.evaluate(`document.querySelector('#contact-name').focus({ preventScroll: true })`);
  await waitFor(`document.querySelector('app-home-contact app-contact-form').classList.contains('reveal-visible')`);
  assert.equal(await browser.evaluate(`getComputedStyle(document.querySelector('app-home-contact app-contact-form')).opacity`), '1');
  assert.equal(await browser.evaluate(`document.querySelector('.sector-grid figure').classList.contains('reveal-visible')`), false);
  await browser.evaluate(`document.activeElement.blur(); document.querySelector('.sector-grid').scrollIntoView({ block: 'center' })`);
  await waitFor(`document.querySelector('.sector-grid figure').classList.contains('reveal-visible')`);
  await waitFor(`getComputedStyle(document.querySelector('.sector-grid figure')).opacity === '1'`);
  await browser.evaluate('scrollTo(0, 0)');
  assert.equal(await browser.evaluate(`document.querySelector('.sector-grid figure').classList.contains('reveal-visible')`), true);

  const routes = ['/', '/nosotros', '/soluciones/planillas-y-control-de-asistencia', '/soluciones/salud-y-seguridad-ocupacional', '/soluciones/gestion-del-talento-humano', '/soluciones/hostigamiento-laboral-y-sexual', '/soluciones/e-learning', '/soluciones/auditoria-laboral', '/soluciones/ley-30709', '/soluciones/hr-analytics', '/soluciones/payroll', '/soluciones/evaluacion-de-desempeno', '/soluciones/encuesta-de-clima-laboral', '/soluciones/firmas-digitales-certificadas', '/soluciones/mejora-de-procesos', '/soluciones/consultoria-en-tecnologia', '/soluciones/gestion-de-base-de-datos', '/soluciones/pentesting', '/soluciones/data-center', '/soluciones/backup-empresarial', '/blog'];
  for (const width of [1366, 390, 320]) {
    await resize(width);
    for (const route of routes) {
      await navigate(route);
      const state = await browser.evaluate(`({ page: document.documentElement.scrollWidth, viewport: innerWidth, targets: document.querySelectorAll('main .reveal-ready').length, overlay: !!document.querySelector('vite-error-overlay') })`);
      assert.ok(state.page <= state.viewport, `No horizontal overflow while entering ${route} at ${width}px`);
      assert.ok(state.targets > 0);
      assert.equal(state.overlay, false);
      await waitFor(`document.querySelector('main .reveal-ready').classList.contains('reveal-visible') && getComputedStyle(document.querySelector('main .reveal-ready')).opacity === '1'`);
      layouts.push({ route, width, ...state });
    }
  }

  // A preference change immediately exposes blocks that have not entered the viewport.
  await navigate('/nosotros');
  await browser.page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await waitFor(`!document.querySelector('.reveal-ready:not(.reveal-visible)')`);
  assert.equal(await browser.evaluate(`getComputedStyle(document.querySelector('#about-title')).transitionDuration`), '0s');
  await reloadAbout();
  assert.equal(await browser.evaluate(`document.querySelectorAll('.reveal-ready').length`), 0);
  assert.equal(await browser.evaluate(`getComputedStyle(document.querySelector('#about-title')).opacity`), '1');

  // Without browser observation, the default presentation stays visible.
  await browser.page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await browser.page('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window, 'IntersectionObserver', { value: undefined });` });
  await reloadAbout();
  assert.equal(await browser.evaluate(`document.querySelectorAll('.reveal-ready').length`), 0);
  assert.equal(await browser.evaluate(`getComputedStyle(document.querySelector('#about-title')).opacity`), '1');
  assert.deepEqual(errors, []);
  await writeFile('artifacts/motion-ui-checks.json', JSON.stringify({ passed: true, entrance, layouts, errors }, null, 2));
  console.log(`Motion passed: real left/right transitions, scroll reveal, focus, ${routes.length} routes at three widths, reduced motion and browser fallback.`);
} finally { await browser.close(); }
