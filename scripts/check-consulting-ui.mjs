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
  await waitFor(`!!document.querySelector('.service-groups button:nth-child(3)')`);
  await browser.evaluate(`document.querySelector('.service-groups button:nth-child(3)').dispatchEvent(new MouseEvent('mouseenter'))`);
  await waitFor(`!!document.querySelector('.service-links a[href="/soluciones/consultoria-en-tecnologia"]')`);
  await click('.service-links a[href="/soluciones/consultoria-en-tecnologia"]');
  await waitFor(`!!document.querySelector('app-consultoria-tecnologia h1')`);
  await waitFor(`document.title === 'Consultoría en Tecnología | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.consulting-benefit').length`), 8);
  assert.deepEqual(await browser.evaluate(`[...document.querySelectorAll('app-technology-experts h3')].map(heading => heading.textContent)`), ['Robert Palomino de la Gala Núñez', 'Martin Vera', 'Luis Madrid Guerra']);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 3);
  assert.equal(await browser.evaluate(`!!document.querySelector('app-floating-menu')`), false);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-header').length`), 1);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-footer').length`), 1);
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.fonts.ready.then(() => true)');
  assert.deepEqual(await browser.evaluate(`[...document.querySelectorAll('app-consultoria-tecnologia img')].map(img => img.getAttribute('src').split('/').pop())`), ['consultoria-tecnologia.png', 'digital-modernizacion.svg', 'diagnostico-integral.svg', 'modelo-objetivo.svg', 'optimizacion-areas.svg', 'roadmap-tecnologico.svg', 'planes-estrategicos.svg', 'elaboracion-optimizacion.svg', 'iniciativas-priorizacion.svg', 'robert-palomino.png', 'martin-vera.png', 'luis-madrid.png']);
  assert.equal(await browser.evaluate(`document.querySelector('label[for="meeting-platform"]').textContent`), '¿Qué servicio necesitas?');
  await browser.evaluate('document.activeElement?.blur()');
  await screenshot('consulting-desktop');
  for (const language of ['es', 'en']) {
    await browser.evaluate(`document.querySelector('#site-language').value = '${language}'; document.querySelector('#site-language').dispatchEvent(new Event('change', { bubbles: true }));`);
    await waitFor(`document.documentElement.lang === '${language === 'es' ? 'es-PE' : 'en'}'`);
    for (const width of [1366, 1043, 768, 390, 320]) {
      await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
      await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
      const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
      layouts.push({ language, width, ...dimensions });
      assert.ok(dimensions.page <= dimensions.viewport, `Technology consulting overflow in ${language} at ${width}px`);
      assert.equal(await browser.evaluate(`!!document.querySelector('vite-error-overlay')`), false);
      if (language === 'es' && width === 1043) await screenshot('consulting-reference-width');
      if (language === 'es' && width === 390) await screenshot('consulting-mobile');
    }
  }
  await waitFor(`document.title === 'Technology Consulting | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelector('app-consultoria-tecnologia h1').textContent.trim()`), 'We turn technology into strategic results');
  assert.equal(await browser.evaluate(`document.querySelector('app-technology-experts h2').textContent`), 'Experts in the technology sector');
  assert.deepEqual(await browser.evaluate(`[...document.querySelectorAll('app-technology-experts h3')].map(heading => heading.textContent)`), ['Robert Palomino de la Gala Núñez', 'Martin Vera', 'Luis Madrid Guerra']);
  assert.equal(await browser.evaluate(`document.querySelector('.benefit-copy h3').textContent`), 'Digital Transformation and Technology Modernization');
  assert.equal(await browser.evaluate(`document.querySelector('label[for="meeting-platform"]').textContent`), 'Which service do you need?');
  await click('app-faq-list summary');
  await waitFor(`!document.querySelector('app-faq-list details').open`);
  await click('app-faq-list summary');
  await waitFor(`document.querySelector('app-faq-list details').open`);
  await browser.evaluate(`document.querySelector('app-meeting-request form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))`);
  await waitFor(`document.querySelectorAll('app-meeting-request [aria-invalid="true"]').length === 4`);
  assert.ok(await browser.evaluate(`document.querySelector('#meeting-platform-error').textContent.includes('Select a service.')`));
  await browser.evaluate(`document.querySelector('#meeting-email').value = 'consulting@example.com'; document.querySelector('#meeting-email').dispatchEvent(new Event('input')); document.querySelector('#meeting-platform').value = 'consultoria-en-tecnologia'; document.querySelector('#meeting-platform').dispatchEvent(new Event('change')); document.querySelector('#site-language').value = 'es'; document.querySelector('#site-language').dispatchEvent(new Event('change', { bubbles: true }));`);
  await waitFor(`document.documentElement.lang === 'es-PE'`);
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-email').value`), 'consulting@example.com');
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-platform').selectedOptions[0].textContent`), 'Consultoría en Tecnología');
  await browser.page('Page.navigate', { url: origin + '/blog' });
  await waitFor(`!!document.querySelector('app-blog h1')`);
  await browser.page('Page.navigate', { url: origin + '/soluciones/consultoria-en-tecnologia' });
  await waitFor(`!!document.querySelector('app-consultoria-tecnologia h1')`);
  await browser.page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await browser.page('Page.navigate', { url: origin + '/soluciones/consultoria-en-tecnologia' });
  await waitFor(`document.querySelector('.consulting-hero .hero-copy')?.classList.contains('reveal-ready')`);
  await waitFor(`document.querySelector('.consulting-hero .hero-copy')?.classList.contains('reveal-visible') && getComputedStyle(document.querySelector('.consulting-hero .hero-copy')).opacity === '1'`);
  assert.deepEqual(errors, []);
  await writeFile('artifacts/consulting-ui-checks.json', JSON.stringify({ passed: true, origin, layouts, errors }, null, 2));
  console.log('Technology consulting passed: menu, direct route, hero image, three portraits and eight SVGs, five widths, both languages, FAQ, service form and animation.');
} finally { await browser.close(); }




