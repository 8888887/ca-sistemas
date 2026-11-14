import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname, relative } from 'node:path';
import { launchBrowser } from './browser.mjs';

const root = resolve('dist/ca-sistemas/browser');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.ico': 'image/x-icon' };
const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let file = resolve(root, '.' + pathname);
  if (relative(root, file).startsWith('..')) { response.writeHead(403).end(); return; }
  if (!extname(file)) file = resolve(root, 'index.html');
  try { response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream'); response.end(await readFile(file)); }
  catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await launchBrowser();
const errors = [];
browser.onEvent(message => {
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) errors.push(`${message.params.response.status} ${message.params.response.url}`);
});
const waitFor = async expression => {
  for (let i = 0; i < 80; i++) {
    if (await browser.evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out: ${expression}`);
};
const click = selector => browser.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const hover = selector => browser.evaluate(`document.querySelector(${JSON.stringify(selector)}).dispatchEvent(new MouseEvent('mouseenter'))`);
const changeLanguage = async language => {
  await browser.evaluate(`(() => { const select = document.querySelector('#site-language'); select.value = ${JSON.stringify(language)}; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await waitFor(`document.documentElement.lang === ${JSON.stringify(language === 'es' ? 'es-PE' : 'en')}`);
};
const screenshot = async (name, fullPage = false) => {
  const metrics = await browser.page('Page.getLayoutMetrics');
  const clip = fullPage ? { x: 0, y: 0, width: metrics.cssContentSize.width, height: metrics.cssContentSize.height, scale: 1 } : undefined;
  const result = await browser.page('Page.captureScreenshot', { format: 'png', ...(clip ? { clip, captureBeyondViewport: true } : {}) });
  await writeFile(`artifacts/${name}.png`, Buffer.from(result.data, 'base64'));
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
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.fonts.ready.then(() => true)');
  await screenshot('home-desktop', true);
  await click('.solutions-trigger');
  await waitFor(`document.querySelectorAll('.platform-links a').length === 5`);
  await screenshot('menu-platform');
  await browser.evaluate(`document.querySelector('.categories button:first-child').focus()`);
  await browser.page('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab' });
  await browser.page('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab' });
  assert.equal(await browser.evaluate(`document.activeElement.textContent.includes('Servicios Adicionales')`), true);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.platform-links a').length`), 5, 'Tab does not switch away from platform links');
  await browser.page('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab' });
  await browser.page('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab' });
  assert.equal(await browser.evaluate(`document.activeElement.closest('.platform-links') !== null`), true, 'Platform links are reachable with Tab');
  await hover('.categories button:nth-child(2)');
  await waitFor(`document.querySelectorAll('.service-links a').length === 6`);
  await screenshot('menu-human-resources');
  await browser.evaluate(`document.querySelector('.service-groups button:nth-child(2)').focus()`);
  await browser.page('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: '\r' });
  await browser.page('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await waitFor(`document.querySelectorAll('.service-links a').length === 2`);
  await screenshot('menu-business');
  await hover('.service-groups button:nth-child(3)');
  await waitFor(`document.querySelectorAll('.service-links a').length === 5`);
  assert.ok(await browser.evaluate(`document.querySelector('.service-links a[href="/soluciones/data-center"]').getBoundingClientRect().height <= 54`), 'Desktop technology labels fit on one line');
  await screenshot('menu-technology');
  await browser.page('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await waitFor(`!document.querySelector('app-floating-menu')`);
  assert.equal(await browser.evaluate(`document.activeElement.classList.contains('solutions-trigger')`), true, 'Escape returns focus to Soluciones');
  await click('.solutions-trigger');
  await waitFor(`!!document.querySelector('.platform-links a')`);
  await click('.platform-links a');
  await waitFor(`!!document.querySelector('app-planillas-control-asistencia h1')`);
  assert.equal(await browser.evaluate(`document.querySelector('app-planillas-control-asistencia .module-label').textContent`), 'Planillas y Control de Asistencia');
  assert.equal(await browser.evaluate(`document.querySelector('#payroll-title').innerText.replace(/\\s+/g, ' ').trim()`), 'Optimiza tus procesos administrativos');
  assert.equal(await browser.evaluate(`document.querySelector('#workflow-title').textContent`), 'Todo comienza con información ordenada.');
  assert.equal(await browser.evaluate(`!!document.querySelector('app-floating-menu')`), false, 'Navigation closes the menu');
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.activeElement?.blur()');
  await screenshot('payroll-desktop', true);
  const payrollLayouts = [];
  for (const width of [1366, 1043, 768, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    payrollLayouts.push({ language: 'es', width, ...dimensions });
    assert.ok(dimensions.page <= dimensions.viewport, `Payroll overflow at ${width}px: ${JSON.stringify(dimensions)}`);
    if (width === 1043) await screenshot('payroll-reference-width', true);
    if (width === 390) await screenshot('payroll-mobile', true);
  }
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 3);
  await click('app-faq-list summary');
  await waitFor(`!document.querySelector('app-faq-list details').open`);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 2);
  await browser.evaluate(`document.querySelector('app-faq-list summary').focus()`);
  await browser.page('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: '\r' });
  await browser.page('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await waitFor(`document.querySelector('app-faq-list details').open`);
  await browser.evaluate(`document.querySelector('app-meeting-request form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))`);
  await waitFor(`document.querySelectorAll('app-meeting-request [aria-invalid="true"]').length === 4`);
  await browser.evaluate(`document.querySelector('#meeting-email').value = 'ana@example.com'; document.querySelector('#meeting-email').dispatchEvent(new Event('input'))`);
  await changeLanguage('en');
  await waitFor(`document.querySelector('app-planillas-control-asistencia .module-label')?.textContent === 'Payroll and Attendance Control'`);
  assert.equal(await browser.evaluate(`document.querySelector('#workflow-title').textContent`), 'It all starts with organized information.');
  await waitFor(`document.title === 'Payroll and Attendance Control | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-email').value`), 'ana@example.com');
  assert.ok(await browser.evaluate(`document.querySelector('app-faq-list h2').textContent.includes('Frequently asked questions')`));
  assert.equal(await browser.evaluate(`document.querySelector('.attendance-table').alt`), 'View of filters and records in the Empresarial-RH attendance control module');
  assert.equal(await browser.evaluate(`document.querySelector('.attendance-table').naturalWidth`), 648);
  for (const width of [1366, 1043, 768, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    payrollLayouts.push({ language: 'en', width, ...dimensions });
    assert.ok(dimensions.page <= dimensions.viewport, `English payroll overflow at ${width}px: ${JSON.stringify(dimensions)}`);
  }
  await changeLanguage('es');
  await browser.page('Page.reload');
  await waitFor(`!!document.querySelector('app-planillas-control-asistencia h1')`);
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await click('.solutions-trigger');
  await waitFor(`!!document.querySelector('.platform-links a[href="/soluciones/salud-y-seguridad-ocupacional"]')`);
  await click('.platform-links a[href="/soluciones/salud-y-seguridad-ocupacional"]');
  await waitFor(`!!document.querySelector('app-salud-seguridad-ocupacional h1')`);
  await waitFor(`document.title === 'Salud y Seguridad Ocupacional | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelector('.module-label').textContent`), 'Salud y Seguridad Ocupacional');
  assert.equal(await browser.evaluate(`document.querySelectorAll('.safety-feature').length`), 4);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.safety-feature.is-reversed').length`), 2);
  assert.equal(await browser.evaluate(`!!document.querySelector('app-floating-menu')`), false);
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.activeElement?.blur()');
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-salud-seguridad-ocupacional img').length`), 5);
  const safetyHeroSpacing = await browser.evaluate(`(() => {
    const header = document.querySelector('.header-bar').getBoundingClientRect();
    const label = document.querySelector('app-salud-seguridad-ocupacional .module-label').getBoundingClientRect();
    const copy = document.querySelector('.safety-hero .hero-copy').getBoundingClientRect();
    const image = document.querySelector('.safety-hero .platform-preview').getBoundingClientRect();
    return { above: label.top - header.bottom, between: image.left - copy.right };
  })()`);
  assert.ok(safetyHeroSpacing.above >= 40, 'Safety intro is separated from the floating header');
  assert.ok(safetyHeroSpacing.between >= 100, 'Safety text and image have a clear desktop gap');
  await screenshot('safety-desktop', true);
  const safetyLayouts = [];
  for (const width of [1366, 1043, 768, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    safetyLayouts.push({ language: 'es', width, ...dimensions });
    assert.ok(dimensions.page <= dimensions.viewport, `Safety page overflow at ${width}px: ${JSON.stringify(dimensions)}`);
    if (width > 760) {
      const safetyColumnAlignment = await browser.evaluate(`(() => {
        const imageLeft = document.querySelector('.safety-feature img').getBoundingClientRect().left;
        return [...document.querySelectorAll('.safety-feature.is-reversed .feature-copy')].map(copy => Math.abs(copy.getBoundingClientRect().left - imageLeft));
      })()`);
      assert.ok(safetyColumnAlignment.every(offset => offset <= 1), `Safety right-column text aligns with the images above at ${width}px`);
    }
    if (width === 1043) await screenshot('safety-reference-width', true);
    if (width === 390) await screenshot('safety-mobile', true);
  }
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 3);
  await click('app-faq-list summary');
  await waitFor(`!document.querySelector('app-faq-list details').open`);
  await click('app-faq-list summary');
  await waitFor(`document.querySelector('app-faq-list details').open`);
  await browser.evaluate(`document.querySelector('app-meeting-request form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))`);
  await waitFor(`document.querySelectorAll('app-meeting-request [aria-invalid="true"]').length === 4`);
  await browser.evaluate(`document.querySelector('#meeting-email').value = 'safety@example.com'; document.querySelector('#meeting-email').dispatchEvent(new Event('input')); document.querySelector('#meeting-platform').value = 'salud-y-seguridad-ocupacional'; document.querySelector('#meeting-platform').dispatchEvent(new Event('change'));`);
  await changeLanguage('en');
  await waitFor(`document.querySelector('.module-label')?.textContent === 'Occupational Health and Safety'`);
  await waitFor(`document.title === 'Occupational Health and Safety | CA Sistemas'`);
  assert.ok(await browser.evaluate(`document.querySelector('#safety-title').textContent.includes('Simplify')`));
  assert.ok(await browser.evaluate(`document.querySelector('.safety-feature h2').textContent.includes('Identify risks')`));
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-email').value`), 'safety@example.com');
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-platform').selectedOptions[0].textContent`), 'Occupational Health and Safety');
  for (const width of [1366, 1043, 768, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    safetyLayouts.push({ language: 'en', width, ...dimensions });
    assert.ok(dimensions.page <= dimensions.viewport, `English safety page overflow at ${width}px: ${JSON.stringify(dimensions)}`);
  }
  await browser.page('Page.reload');
  await waitFor(`document.querySelector('app-salud-seguridad-ocupacional .module-label')?.textContent === 'Occupational Health and Safety'`);
  await changeLanguage('es');
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await click('.solutions-trigger');
  await waitFor(`!!document.querySelector('.platform-links a[href="/soluciones/gestion-del-talento-humano"]')`);
  await click('.platform-links a[href="/soluciones/gestion-del-talento-humano"]');
  await waitFor(`!!document.querySelector('app-gestion-talento-humano h1')`);
  await waitFor(`document.title === 'Gestión del Talento Humano | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelector('.module-label').textContent`), 'Gestión del Talento Humano');
  assert.equal(await browser.evaluate(`document.querySelectorAll('.talent-feature').length`), 3);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.benefit-list li').length`), 9);
  assert.equal(await browser.evaluate(`!!document.querySelector('app-floating-menu')`), false);
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.activeElement?.blur()');
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-gestion-talento-humano img').length`), 4);
  await screenshot('talent-desktop', true);
  const talentLayouts = [];
  for (const width of [1366, 1043, 768, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    talentLayouts.push({ language: 'es', width, ...dimensions });
    assert.ok(dimensions.page <= dimensions.viewport, `Talent page overflow at ${width}px: ${JSON.stringify(dimensions)}`);
    if (width > 760) {
      const alignment = await browser.evaluate(`Math.abs(document.querySelector('.talent-feature img').getBoundingClientRect().left - document.querySelector('.talent-feature.is-reversed .feature-copy').getBoundingClientRect().left)`);
      assert.ok(alignment <= 1, 'Talent right-column copy aligns with the image above');
    }
    if (width === 1043) await screenshot('talent-reference-width', true);
    if (width === 390) await screenshot('talent-mobile', true);
  }
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 4);
  await click('app-faq-list details:last-child summary');
  await waitFor(`!document.querySelector('app-faq-list details:last-child').open`);
  await click('app-faq-list details:last-child summary');
  await waitFor(`document.querySelector('app-faq-list details:last-child').open`);
  await browser.evaluate(`document.querySelector('app-meeting-request form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))`);
  await waitFor(`document.querySelectorAll('app-meeting-request [aria-invalid="true"]').length === 4`);
  await browser.evaluate(`document.querySelector('#meeting-email').value = 'talent@example.com'; document.querySelector('#meeting-email').dispatchEvent(new Event('input')); document.querySelector('#meeting-platform').value = 'gestion-del-talento-humano'; document.querySelector('#meeting-platform').dispatchEvent(new Event('change'));`);
  await changeLanguage('en');
  await waitFor(`document.querySelector('.module-label')?.textContent === 'Talent Management'`);
  await waitFor(`document.title === 'Talent Management | CA Sistemas'`);
  assert.ok(await browser.evaluate(`document.querySelector('#talent-title').textContent.includes('Manage')`));
  assert.ok(await browser.evaluate(`document.querySelector('.talent-feature h2').textContent.includes('Recruitment and onboarding')`));
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-email').value`), 'talent@example.com');
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-platform').selectedOptions[0].textContent`), 'Talent Management');
  for (const width of [1366, 1043, 768, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    talentLayouts.push({ language: 'en', width, ...dimensions });
    assert.ok(dimensions.page <= dimensions.viewport, `English talent page overflow at ${width}px: ${JSON.stringify(dimensions)}`);
  }
  await browser.page('Page.reload');
  await waitFor(`document.querySelector('app-gestion-talento-humano .module-label')?.textContent === 'Talent Management'`);
  await changeLanguage('es');
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await click('.solutions-trigger');
  await waitFor(`!!document.querySelector('.platform-links a[href="/soluciones/hostigamiento-laboral-y-sexual"]')`);
  await click('.platform-links a[href="/soluciones/hostigamiento-laboral-y-sexual"]');
  await waitFor(`!!document.querySelector('app-hostigamiento-laboral-sexual h1')`);
  await waitFor(`document.title === 'Hostigamiento Laboral y Sexual | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.harassment-feature').length`), 3);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.benefit-list li').length`), 9);
  assert.equal(await browser.evaluate(`!!document.querySelector('app-floating-menu')`), false);
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await browser.evaluate('document.activeElement?.blur()');
  assert.deepEqual(await browser.evaluate(`[...document.querySelectorAll('app-hostigamiento-laboral-sexual img')].map(img => img.getAttribute('src').split('/').pop())`), ['plataforma-hostigamiento.png', 'prevencion-cumplimiento.png', 'registro-incidentes.png', 'capacitacion-equipo.png']);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-faq-list details[open]').length`), 4);
  await click('app-faq-list summary');
  await waitFor(`!document.querySelector('app-faq-list details').open`);
  await click('app-faq-list summary');
  await waitFor(`document.querySelector('app-faq-list details').open`);
  await screenshot('harassment-desktop', true);
  const harassmentLayouts = [];
  for (const language of ['es', 'en']) {
    await changeLanguage(language);
    await waitFor(`document.querySelector('.module-label')?.textContent === ${JSON.stringify(language === 'es' ? 'Hostigamiento Laboral y Sexual' : 'Workplace and Sexual Harassment')}`);
    for (const width of [1366, 1043, 768, 390, 320]) {
      await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
      await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
      const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
      harassmentLayouts.push({ language, width, ...dimensions });
      assert.ok(dimensions.page <= dimensions.viewport, `Harassment page overflow in ${language} at ${width}px`);
      if (width > 760) {
        const alignment = await browser.evaluate(`Math.abs(document.querySelector('.harassment-feature img').getBoundingClientRect().left - document.querySelector('.harassment-feature.is-reversed .feature-copy').getBoundingClientRect().left)`);
        assert.ok(alignment <= 1, 'Harassment text aligns with the image above');
      }
      if (language === 'es' && width === 1043) await screenshot('harassment-reference-width', true);
      if (language === 'es' && width === 390) await screenshot('harassment-mobile', true);
    }
  }
  await waitFor(`document.title === 'Workplace and Sexual Harassment | CA Sistemas'`);
  assert.ok(await browser.evaluate(`document.querySelector('#harassment-title').textContent.includes('how to identify it')`));
  assert.equal(await browser.evaluate(`document.querySelector('.harassment-feature h2').textContent`), 'Prevention and compliance monitoring');
  await browser.evaluate(`document.querySelector('#meeting-email').value = 'harassment@example.com'; document.querySelector('#meeting-email').dispatchEvent(new Event('input')); document.querySelector('#meeting-platform').value = 'hostigamiento-laboral-y-sexual'; document.querySelector('#meeting-platform').dispatchEvent(new Event('change'));`);
  await changeLanguage('es');
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-email').value`), 'harassment@example.com');
  assert.equal(await browser.evaluate(`document.querySelector('#meeting-platform').selectedOptions[0].textContent`), 'Hostigamiento Laboral y Sexual');
  await browser.page('Page.reload');
  await waitFor(`document.querySelector('app-hostigamiento-laboral-sexual .module-label')?.textContent === 'Hostigamiento Laboral y Sexual'`);
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await browser.page('Page.navigate', { url: `${origin}/soluciones/pentesting` });
  await waitFor(`document.querySelector('app-pentesting h1')?.textContent.trim() === 'Encuentra y corrige antes que los atacantes lo hagan'`);
  await browser.page('Page.navigate', { url: `${origin}/no-existe` });
  await waitFor(`!!document.querySelector('app-not-found')`);
  await browser.page('Page.navigate', { url: origin });
  await waitFor(`!!document.querySelector('app-home h1')`);
  const layouts = [];
  for (const width of [1366, 1024, 768, 760, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    layouts.push({ width, ...dimensions });
    if (dimensions.page > dimensions.viewport) {
      await screenshot(`overflow-${width}`);
      console.log(await browser.evaluate(`JSON.stringify([...document.querySelectorAll('body *')].map(el => ({ tag: el.tagName, class: el.className, width: el.getBoundingClientRect().width, right: el.getBoundingClientRect().right, font: getComputedStyle(el).fontSize })).filter(el => el.right > innerWidth + 2).slice(0, 25))`));
    }
    assert.ok(dimensions.page <= dimensions.viewport, `No page overflow at ${width}px: ${JSON.stringify(dimensions)}`);
  }
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  await browser.evaluate(`document.querySelectorAll('img').forEach(img => img.loading = 'eager'); Promise.all([...document.images].map(img => img.decode()))`);
  await screenshot('home-mobile', true);
  await click('.mobile-toggle');
  await click('.solutions-trigger');
  await waitFor(`!!document.querySelector('.platform-links')`);
  await hover('.categories button:nth-child(2)');
  await waitFor(`document.querySelectorAll('.service-links a').length === 6`);
  await screenshot('menu-mobile');
  await click('app-home h1');
  await waitFor(`!document.querySelector('app-floating-menu')`);
  await browser.evaluate(`document.querySelector('#contact-name').value = 'Ana'; document.querySelector('#contact-name').dispatchEvent(new Event('input'))`);
  await changeLanguage('en');
  await waitFor(`document.querySelector('app-home h1').textContent.includes('Automate your')`);
  assert.equal(await browser.evaluate(`document.querySelector('#contact-name').value`), 'Ana', 'Language switching preserves form data');
  assert.equal(await browser.evaluate(`document.querySelector('#contact-company').placeholder`), 'Company');
  assert.ok(await browser.evaluate(`document.querySelector('.site-footer').textContent.includes('All rights reserved')`));
  const englishLayouts = [];
  for (const width of [1366, 1100, 1024, 961, 960, 768, 390, 320]) {
    await browser.page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    const dimensions = await browser.evaluate(`({ viewport: innerWidth, page: document.documentElement.scrollWidth })`);
    englishLayouts.push({ width, ...dimensions });
    assert.ok(dimensions.page <= dimensions.viewport, `English page overflow at ${width}px: ${JSON.stringify(dimensions)}`);
    if (width === 1366) await screenshot('language-english-desktop');
  }
  await browser.page('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  await click('.solutions-trigger');
  await waitFor(`document.querySelector('.categories').textContent.includes('Platform')`);
  await hover('.categories button:nth-child(2)');
  await waitFor(`document.querySelector('.service-links').textContent.includes('Labor Audit')`);
  await screenshot('language-english-menu');
  await click('.service-links a');
  await waitFor(`document.querySelector('app-auditoria-laboral h1 span')?.textContent.trim() === 'Labor Audit'`);
  await waitFor(`document.title === 'Labor Audit | CA Sistemas'`);
  assert.equal(await browser.evaluate(`document.querySelector('#site-language').value`), 'en');
  await browser.page('Page.reload');
  await waitFor(`document.querySelector('app-auditoria-laboral h1 span')?.textContent.trim() === 'Labor Audit'`);
  assert.equal(await browser.evaluate(`document.documentElement.lang`), 'en', 'Language preference survives reload');
  const englishUrl = await browser.evaluate('location.href');
  await changeLanguage('es');
  await waitFor(`document.querySelector('app-auditoria-laboral h1 span')?.textContent.trim() === 'Auditoría Laboral'`);
  await waitFor(`document.title === 'Auditoría Laboral | CA Sistemas'`);
  assert.equal(await browser.evaluate('location.href'), englishUrl, 'Changing language keeps the current route');
  assert.deepEqual(errors, [], 'No browser exceptions or missing assets');
  await writeFile('artifacts/ui-checks.json', JSON.stringify({ passed: true, layouts, englishLayouts, payrollLayouts, safetyLayouts, talentLayouts, harassmentLayouts, checks: ['Menu platform/HR/business/technology', 'Keyboard focus and Escape', 'Navigation and direct solution URLs', 'Dedicated payroll, safety, talent and harassment pages reached through the menu', 'Platform layouts in five widths and both languages', 'Original safety, talent and harassment images loaded in their matching sections', 'Talent and harassment benefits and four FAQ entries', 'Native FAQ disclosure by click and Enter', 'Meeting form validation and preservation on language change', '404 route', 'Mobile menu and outside click', 'Local images and fonts', 'Responsive widths in both languages', 'Live language switching without losing form data', 'Translated navigation, page content, form, footer and document titles', 'Language persistence on navigation and reload'], errors }, null, 2));
  console.log('UI checks passed. Screenshots and report: artifacts/');
} finally { await browser.close(); server.close(); }
