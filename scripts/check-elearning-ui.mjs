import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { launchBrowser } from './browser.mjs';

// Check the same development server the user opens, including Vite error overlays.
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
const screenshot = async name => {
  const { cssContentSize } = await browser.page('Page.getLayoutMetrics');
  const { data } = await browser.page('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 } });
  await writeFile(`artifacts/${name}.png`, Buffer.from(data, 'base64'));
};
try {
  await mkdir('artifacts', { recursive: true });
  // Layout checks use reduced motion; check-motion-ui.mjs exercises real transitions.
  await browser.page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await browser.page('Runtime.enable');
  await browser.page('Network.enable');
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await browser.page('Page.navigate', { url: origin });
  await waitFor(`!!document.querySelector('app-home h1')`);
  await click('.solutions-trigger');
  await waitFor(`!!document.querySelector('.platform-links a[href="/soluciones/e-learning"]')`);
  await click('.platform-links a[href="/soluciones/e-learning"]');
  await waitFor(`!!document.querySelector('app-e-learning h1')`);
  assert.equal(await browser.evaluate(`!!document.querySelector('app-floating-menu')`), false);
  assert.equal(await browser.evaluate(`document.title`), 'E-Learning | CA Sistemas');
  assert.equal(await browser.evaluate(`document.querySelectorAll('.elearning-feature').length`), 3);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.benefit-list li').length`), 9);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 4);
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.fonts.ready');
  assert.deepEqual(await browser.evaluate(`[...document.querySelectorAll('app-e-learning img')].map(img => img.getAttribute('src').split('/').pop())`), ['plataforma-elearning.png', 'programas-capacitacion.png', 'rutas-aprendizaje.png', 'seguimiento-progreso.png']);
  await browser.evaluate('document.activeElement?.blur()');
  await screenshot('elearning-desktop');
  for (const language of ['es', 'en']) {
    await browser.evaluate(`(() => { const select = document.querySelector('#site-language'); select.value = '${language}'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
    await waitFor(`document.documentElement.lang === '${language === 'es' ? 'es-PE' : 'en'}'`);
    for (const width of [1366, 1043, 768, 390, 320]) {
      await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
      await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
      const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
      layouts.push({ language, width, ...dimensions });
      assert.ok(dimensions.page <= dimensions.viewport, `E-Learning overflow in ${language} at ${width}px`);
      assert.equal(await browser.evaluate(`!!document.querySelector('vite-error-overlay')`), false);
      if (width > 760) {
        const alignment = await browser.evaluate(`Math.abs(document.querySelector('.elearning-feature img').getBoundingClientRect().left - document.querySelector('.elearning-feature.is-reversed .feature-copy').getBoundingClientRect().left)`);
        assert.ok(alignment <= 1, 'Right-column text aligns with the image above');
      }
      if (language === 'es' && width === 1043) await screenshot('elearning-reference-width');
      if (language === 'es' && width === 390) await screenshot('elearning-mobile');
    }
  }
  assert.ok(await browser.evaluate(`document.querySelector('#elearning-title').textContent.includes('E-Learning platform')`));
  assert.equal(await browser.evaluate(`document.querySelector('.elearning-feature h2').textContent`), 'Design tailored training programs');
  await click('app-faq-list summary');
  await waitFor(`!document.querySelector('app-faq-list details').open`);
  await click('app-faq-list summary');
  await waitFor(`document.querySelector('app-faq-list details').open`);
  await browser.evaluate(`document.querySelector('app-meeting-request form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))`);
  await waitFor(`document.querySelectorAll('app-meeting-request [aria-invalid="true"]').length === 4`);
  await browser.evaluate(`document.querySelector('#meeting-email').value = 'learning@example.com'; document.querySelector('#meeting-email').dispatchEvent(new Event('input')); document.querySelector('#meeting-platform').value = 'e-learning'; document.querySelector('#meeting-platform').dispatchEvent(new Event('change')); document.querySelector('#site-language').value = 'es'; document.querySelector('#site-language').dispatchEvent(new Event('change', { bubbles: true }));`);
  await waitFor(`document.documentElement.lang === 'es-PE'`);
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-email').value`), 'learning@example.com');
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-platform').value`), 'e-learning');
  await browser.page('Page.reload');
  await waitFor(`document.querySelector('app-e-learning h1')?.textContent.includes('Plataforma de E-Learning')`);
  assert.deepEqual(errors, []);
  await writeFile('artifacts/elearning-ui-checks.json', JSON.stringify({ passed: true, origin, layouts, errors }, null, 2));
  console.log('E-Learning passed: local dev server, menu, direct route, four images, five widths, both languages, FAQ and meeting form.');
} finally { await browser.close(); }
