import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { launchBrowser } from './browser.mjs';

const origin = process.env.UI_ORIGIN || 'http://127.0.0.1:4200';
const browser = await launchBrowser();
const errors = [];
const layouts = [];
const waitFor = async expression => {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await browser.evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out: ${expression}`);
};
const click = selector => browser.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const screenshot = async name => {
  const { cssContentSize } = await browser.page('Page.getLayoutMetrics');
  const { data } = await browser.page('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 } });
  await writeFile(`artifacts/${name}.png`, Buffer.from(data, 'base64'));
};
browser.onEvent(event => {
  if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails.text);
  if (event.method === 'Network.responseReceived' && event.params.response.status >= 400) errors.push(event.params.response.url);
});
try {
  await mkdir('artifacts', { recursive: true });
  await browser.page('Runtime.enable');
  await browser.page('Network.enable');
  await browser.page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await browser.page('Page.navigate', { url: origin });
  await waitFor(`!!document.querySelector('app-home h1')`);
  await click('.solutions-trigger');
  await waitFor(`!!document.querySelector('.categories button:nth-child(2)')`);
  await browser.evaluate(`document.querySelector('.categories button:nth-child(2)').dispatchEvent(new MouseEvent('mouseenter'))`);
  await waitFor(`!!document.querySelector('.service-links a[href="/soluciones/ley-30709"]')`);
  await click('.service-links a[href="/soluciones/ley-30709"]');
  await waitFor(`!!document.querySelector('app-ley-30709 h1')`);
  await waitFor(`document.title === 'Implementación de la Ley 30709 | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.law-feature-section').length`), 5);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 3);
  assert.equal(await browser.evaluate(`!!document.querySelector('app-floating-menu')`), false);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-header').length`), 1);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-footer').length`), 1);
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.fonts.ready.then(() => true)');
  assert.deepEqual(await browser.evaluate(`[...document.querySelectorAll('app-ley-30709 img')].map(img => img.getAttribute('src').split('/').pop())`), ['implementacion-ley.png', 'modelo-factores-puntos.png', 'valoracion-puestos.png', 'bandas-salariales.png', 'politicas-internas.png', 'diagnostico-salarial.png']);
  assert.equal(await browser.evaluate(`document.querySelector('label[for="meeting-platform"]').textContent`), '¿Qué servicio necesitas?');
  await browser.evaluate('document.activeElement?.blur()');
  await screenshot('law-desktop');
  for (const language of ['es', 'en']) {
    await browser.evaluate(`document.querySelector('#site-language').value = '${language}'; document.querySelector('#site-language').dispatchEvent(new Event('change', { bubbles: true }));`);
    await waitFor(`document.documentElement.lang === '${language === 'es' ? 'es-PE' : 'en'}'`);
    for (const width of [1366, 1043, 768, 390, 320]) {
      await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
      await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
      const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
      layouts.push({ language, width, ...dimensions });
      assert.ok(dimensions.page <= dimensions.viewport, `Law page overflow in ${language} at ${width}px`);
      assert.equal(await browser.evaluate(`!!document.querySelector('vite-error-overlay')`), false);
      if (language === 'es' && width === 1043) await screenshot('law-reference-width');
      if (language === 'es' && width === 390) await screenshot('law-mobile');
    }
  }
  await waitFor(`document.title === 'Implementation of Law 30709 | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelector('.feature-title').textContent`), 'We create a point-factor model');
  assert.equal(await browser.evaluate(`document.querySelector('label[for="meeting-platform"]').textContent`), 'Which service do you need?');
  await click('app-faq-list summary');
  await waitFor(`!document.querySelector('app-faq-list details').open`);
  await click('app-faq-list summary');
  await waitFor(`document.querySelector('app-faq-list details').open`);
  await browser.evaluate(`document.querySelector('app-meeting-request form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))`);
  await waitFor(`document.querySelectorAll('app-meeting-request [aria-invalid="true"]').length === 4`);
  assert.ok(await browser.evaluate(`document.querySelector('#meeting-platform-error').textContent.includes('Select a service.')`));
  await browser.evaluate(`document.querySelector('#meeting-email').value = 'audit@example.com'; document.querySelector('#meeting-email').dispatchEvent(new Event('input')); document.querySelector('#meeting-platform').value = 'ley-30709'; document.querySelector('#meeting-platform').dispatchEvent(new Event('change')); document.querySelector('#site-language').value = 'es'; document.querySelector('#site-language').dispatchEvent(new Event('change', { bubbles: true }));`);
  await waitFor(`document.documentElement.lang === 'es-PE'`);
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-email').value`), 'audit@example.com');
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-platform').selectedOptions[0].textContent`), 'Implementación de la Ley 30709');
  await browser.page('Page.navigate', { url: origin + '/nosotros' });
  await waitFor(`!!document.querySelector('app-nosotros h1')`);
  await click('app-about-service-card a[href="/soluciones/ley-30709"]');
  await waitFor(`!!document.querySelector('app-ley-30709 h1')`);
  await browser.page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await browser.page('Page.navigate', { url: origin + '/soluciones/ley-30709' });
  await waitFor(`document.querySelector('.law-hero .hero-copy')?.classList.contains('reveal-ready')`);
  await waitFor(`document.querySelector('.law-hero .hero-copy')?.classList.contains('reveal-visible') && getComputedStyle(document.querySelector('.law-hero .hero-copy')).opacity === '1'`);
  assert.deepEqual(errors, []);
  await writeFile('artifacts/law-ui-checks.json', JSON.stringify({ passed: true, origin, layouts, errors }, null, 2));
  console.log('Law 30709 passed: menu, Nosotros service link, direct route, original images, five widths, both languages, FAQ, service form and animation.');
} finally { await browser.close(); }
