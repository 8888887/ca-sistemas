import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname, relative } from 'node:path';
import { launchBrowser } from './browser.mjs';

const root = resolve('dist/ca-sistemas/browser');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.ico': 'image/x-icon' };
const server = createServer(async (request, response) => {
  let file = resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
  if (relative(root, file).startsWith('..')) { response.writeHead(403).end(); return; }
  if (!extname(file)) file = resolve(root, 'index.html');
  try { response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream'); response.end(await readFile(file)); }
  catch { response.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await launchBrowser();
const errors = [];
const layouts = [];
browser.onEvent(event => {
  if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails.text);
  if (event.method === 'Network.responseReceived' && event.params.response.status >= 400) errors.push(event.params.response.url);
});
const waitFor = async expression => {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await browser.evaluate(expression)) return;
    await new Promise(done => setTimeout(done, 70));
  }
  throw new Error(`Timed out: ${expression}`);
};
const settle = () => browser.evaluate('new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)))');
const click = async selector => { await browser.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await settle(); };
const select = category => click(`app-blog .filters [data-category="${category}"]`);
const search = async text => {
  await browser.evaluate(`(() => { const input = document.querySelector('#blog-search'); input.value = ${JSON.stringify(text)}; input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await settle();
};
const count = () => browser.evaluate(`document.querySelectorAll('app-blog-article-card').length`);
const language = async value => {
  await browser.evaluate(`(() => { const select = document.querySelector('#site-language'); select.value = '${value}'; select.dispatchEvent(new Event('change',{bubbles:true})); })()`);
  await settle();
};
const press = async key => {
  const keyCode = key === 'Escape' ? 27 : 9;
  await browser.page('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode });
  await browser.page('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode });
};
const nativeClick = async selector => {
  const point = await browser.evaluate(`(() => {const element = document.querySelector(${JSON.stringify(selector)}); element.scrollIntoView({block:'center'}); const r=element.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
  await browser.page('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await browser.page('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await browser.page('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
};
const screenshot = async (name, fullPage = false) => {
  const { cssContentSize } = await browser.page('Page.getLayoutMetrics');
  const clip = fullPage ? {x:0,y:0,width:cssContentSize.width,height:cssContentSize.height,scale:1} : undefined;
  const { data } = await browser.page('Page.captureScreenshot', { format:'png', captureBeyondViewport:fullPage, ...(clip ? {clip} : {}) });
  await writeFile(`artifacts/${name}.png`, Buffer.from(data,'base64'));
};
try {
  await mkdir('artifacts', {recursive:true});
  await browser.page('Runtime.enable');
  await browser.page('Network.enable');
  await browser.page('Emulation.setEmulatedMedia', { features:[{name:'prefers-reduced-motion',value:'reduce'}] });
  await browser.page('Emulation.setDeviceMetricsOverride', {width:1366,height:1000,deviceScaleFactor:1,mobile:false});
  await browser.page('Page.navigate', {url:origin+'/blog'});
  await waitFor(`document.querySelectorAll('app-blog-article-card').length === 7`);
  await browser.evaluate(`document.querySelectorAll('app-blog img').forEach(img => img.loading='eager'); Promise.all([...document.querySelectorAll('app-blog img')].map(img => img.decode()))`);
  await browser.evaluate('document.fonts.ready.then(() => true)');
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-header').length`),1);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-site-footer').length`),1);
  assert.equal(await browser.evaluate(`document.querySelectorAll('main').length`),1);
  assert.equal(await browser.evaluate(`document.querySelectorAll('app-blog-article-card.featured').length`),1);
  const images = await browser.evaluate(`[...document.querySelectorAll('app-blog img')].map(img => ({src:img.getAttribute('src'),width:img.naturalWidth,height:img.naturalHeight}))`);
  assert.ok(images.every(image => image.src.startsWith('/images/blog/') && image.width>0));
  await screenshot('blog-desktop',true);
  for (const [category, expected] of [['recursos-humanos',2],['gestion-empresarial',1],['tecnologia-y-seguridad',3],['plataforma',1],['all',7]]) {
    await select(category);
    assert.equal(await count(),expected);
    assert.equal(await browser.evaluate(`document.querySelectorAll('app-blog .filters [aria-pressed="true"]').length`),1);
  }
  await search('  EVALUACION ');
  assert.equal(await count(),1);
  await select('tecnologia-y-seguridad');
  assert.equal(await count(),0);
  assert.ok(await browser.evaluate(`document.querySelector('app-blog [role="status"]').textContent.includes('No encontramos')`));
  await search('RESTAURACION');
  assert.equal(await count(),1);
  await select('all');
  await search('');

  await nativeClick('app-blog-article-card:first-child h2 button');
  await waitFor(`!!document.querySelector('dialog[open]')`);
  assert.equal(await browser.evaluate(`document.querySelector('dialog h2').textContent`),'Cómo mejorar la evaluación de desempeño');
  assert.ok(await browser.evaluate(`document.querySelector('dialog p').textContent.includes('fecha de seguimiento')`));
  assert.equal(await browser.evaluate(`document.activeElement === document.querySelector('dialog button')`),true);
  await press('Tab');
  await press('Tab');
  assert.equal(await browser.evaluate(`document.querySelector('dialog').contains(document.activeElement)`),true);
  await screenshot('blog-article-dialog');
  await press('Escape');
  await waitFor(`!document.querySelector('dialog')`);
  assert.equal(await browser.evaluate(`document.activeElement === document.querySelector('app-blog-article-card:first-child h2 button')`),true);

  await select('recursos-humanos');
  await search('EVALUACION');
  await language('en');
  assert.equal(await browser.evaluate(`document.querySelector('#blog-search').value`),'EVALUACION');
  assert.equal(await browser.evaluate(`document.querySelector('app-blog-article-card h2').textContent`),'How to improve performance reviews');
  await search('follow-up');
  assert.equal(await count(),1);
  await nativeClick('app-blog-article-card h2 button');
  await waitFor(`!!document.querySelector('dialog[open]')`);
  assert.equal(await browser.evaluate(`document.querySelector('dialog button').textContent`),'Close');
  await nativeClick('dialog button');
  await waitFor(`!document.querySelector('dialog')`);
  await search('no-existent-article');
  assert.ok(await browser.evaluate(`document.querySelector('app-blog [role="status"]').textContent.includes('No articles match')`));
  await search('');
  await select('all');

  for (const value of ['es','en']) {
    await language(value);
    for (const width of [1366,1100,1024,961,960,768,760,460,390,320]) {
      await browser.page('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
      await settle();
      const layout = await browser.evaluate(`(() => {const intro=document.querySelector('.blog-intro').getBoundingClientRect(); const header=document.querySelector('.header-bar').getBoundingClientRect(); return {width:innerWidth,page:document.documentElement.scrollWidth,columns:getComputedStyle(document.querySelector('.article-grid')).gridTemplateColumns.split(' ').length,noHeaderOverlap:intro.top+scrollY >= header.bottom+scrollY};})()`);
      assert.ok(layout.page<=width,`Overflow ${value} ${width}`);
      assert.equal(layout.columns,width>760?3:width>460?2:1);
      assert.equal(layout.noHeaderOverlap,true);
      layouts.push({language:value,...layout});
      if (width===1366 || width===390) {
        await browser.evaluate('window.scrollTo(0,0)');
        await screenshot(`blog-${value}-${width}`,true);
      }
    }
  }
  await nativeClick('app-blog-article-card h2 button');
  await waitFor(`!!document.querySelector('dialog[open]')`);
  assert.ok(await browser.evaluate(`document.querySelector('dialog').getBoundingClientRect().right <= innerWidth`));
  await screenshot('blog-dialog-mobile');
  await press('Escape');
  await waitFor(`!document.querySelector('dialog')`);
  assert.equal(await browser.evaluate(`document.querySelector('.blog-cta a').getAttribute('href')`),'/#contacto');
  await click('.blog-cta a');
  await waitFor(`!!document.querySelector('app-home #contacto')`);
  assert.deepEqual(errors,[]);
  await writeFile('artifacts/blog-ui.json',JSON.stringify({passed:true,images,layouts,checks:['Categories and combined accent-insensitive search','Supplied article summaries','Modal focus, Tab, Escape and close button','Language switching preserves visitor input','20 responsive layouts','Shared layout and contact link'],errors},null,2));
  console.log('Blog UI passed: seven images, search, categories, keyboard modal, both languages and 20 responsive layouts.');
} finally { await browser.close(); server.close(); }
