import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { launchBrowser } from './browser.mjs';

const origin = process.env.UI_ORIGIN || 'http://127.0.0.1:4200';
const browser = await launchBrowser();
const errors = [];
const layouts = [];
browser.onEvent(event => {
  if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails.text);
  if (event.method === 'Network.responseReceived' && event.params.response.status >= 400) errors.push(event.params.response.url);
});
const waitFor = async expression => {
  for (let attempt = 0; attempt < 80; attempt++) {
    if (await browser.evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out: ${expression}`);
};
const click = selector => browser.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const resize = async width => {
  await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
};
const screenshot = async name => {
  const { cssContentSize } = await browser.page('Page.getLayoutMetrics');
  const { data } = await browser.page('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 } });
  await writeFile(`artifacts/${name}.png`, Buffer.from(data, 'base64'));
};
try {
  await mkdir('artifacts', { recursive: true });
  await browser.page('Runtime.enable');
  await browser.page('Network.enable');
  await resize(1366);
  await browser.page('Page.navigate', { url: origin });
  await waitFor(`!!document.querySelector('app-home h1')`);
  await click('app-site-header a[href="/nosotros"]');
  await waitFor(`!!document.querySelector('app-nosotros h1')`);
  await waitFor(`document.title === 'Nosotros | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-header').length`), 1);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-footer').length`), 1);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-purpose-card').length`), 2);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-value-card').length`), 7);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-about-service-card').length`), 4);
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.fonts.ready.then(() => true)');
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-nosotros img').length`), 10);
  assert.deepEqual(await browser.evaluate(`[...document.querySelectorAll('.team-gallery img')].map(img => img.getAttribute('src').split('/').pop())`), ['soporte-capacitacion.png', 'equipo-oficina.png', 'asesoria-equipo.png']);
  assert.ok(await browser.evaluate(`document.querySelector('app-value-card p').textContent.includes('transparencia y coherencia en cada decisión.')`));
  await browser.evaluate('document.activeElement?.blur()');
  await screenshot('nosotros-desktop');
  for (const language of ['es', 'en']) {
    await browser.evaluate(`(() => { const select = document.querySelector('#site-language'); select.value = '${language}'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
    await waitFor(`document.documentElement.lang === '${language === 'es' ? 'es-PE' : 'en'}'`);
    for (const width of [1366, 1043, 768, 390, 320]) {
      await resize(width);
      const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
      layouts.push({ language, width, ...dimensions });
      assert.ok(dimensions.page <= dimensions.viewport, `Nosotros overflow in ${language} at ${width}px`);
      const overflow = await browser.evaluate(`[...document.querySelectorAll('app-nosotros h1, app-purpose-card, app-value-card, app-about-service-card, .team-gallery img')].filter(element => { const box = element.getBoundingClientRect(); return box.left < -1 || box.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1; }).map(element => element.tagName)`);
      assert.deepEqual(overflow, [], `Nosotros content fits in ${language} at ${width}px`);
      assert.equal(await browser.evaluate(`!!document.querySelector('vite-error-overlay')`), false);
      if (language === 'es' && width === 1043) {
        const cardRows = await browser.evaluate(`[...document.querySelectorAll('app-value-card')].map(card => Math.round(card.getBoundingClientRect().top))`);
        assert.equal(new Set(cardRows.slice(0, 4)).size, 1);
        assert.equal(new Set(cardRows.slice(4)).size, 1);
        await screenshot('nosotros-reference-width');
      }
      if (language === 'es' && width === 390) await screenshot('nosotros-mobile');
    }
  }
  await waitFor(`document.title === 'About us | CA Sistemas'`);
  assert.ok(await browser.evaluate(`document.querySelector('#about-title').textContent.includes('Over 20 years')`));
  assert.equal(await browser.evaluate(`document.querySelector('app-purpose-card h3').textContent`), 'Mission');
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-value-card h3')[5].textContent`), 'Security');
  await browser.page('Page.reload');
  await waitFor(`document.querySelector('app-nosotros h1')?.textContent.includes('Over 20 years')`);
  await resize(1366);
  for (const slug of ['auditoria-laboral', 'hr-analytics', 'ley-30709', 'payroll']) {
    await click(`app-about-service-card a[href="/soluciones/${slug}"]`);
    await waitFor(`!!document.querySelector('app-solution h1')`);
    await click('app-site-footer a[href="/nosotros"]');
    await waitFor(`!!document.querySelector('app-nosotros h1')`);
  }
  await resize(390);
  await click('app-site-header .brand-link');
  await waitFor(`!!document.querySelector('app-home h1')`);
  assert.equal(await browser.evaluate(`document.querySelector('.security-label').textContent`), 'Advanced security');
  await click('.mobile-toggle');
  await click('app-site-header a[href="/nosotros"]');
  await waitFor(`!!document.querySelector('app-nosotros h1')`);
  assert.equal(await browser.evaluate(`document.querySelector('.mobile-toggle').getAttribute('aria-expanded')`), 'false');
  await browser.evaluate(`document.querySelector('#site-language').value = 'es'; document.querySelector('#site-language').dispatchEvent(new Event('change', { bubbles: true }));`);
  await waitFor(`document.title === 'Nosotros | CA Sistemas'`);
  assert.deepEqual(errors, []);
  await writeFile('artifacts/nosotros-ui-checks.json', JSON.stringify({ passed: true, origin, layouts, errors }, null, 2));
  console.log('Nosotros passed: local dev server, header/footer navigation, ten original assets, cards, services, five widths and both languages.');
} finally { await browser.close(); }
