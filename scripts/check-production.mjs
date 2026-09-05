import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Run after npm run build. Guard the internal Next.js polyfill override on upgrades.
const fallback = fs.readFileSync('lib/browser-polyfills.js', 'utf8');
const WrappedURL = function (...args) { return new URL(...args); };
vm.runInNewContext(fallback, { URL: WrappedURL });
assert.equal(WrappedURL.canParse('https://example.com'), true);
assert.equal(WrappedURL.canParse('/path', 'https://example.com'), true);
assert.equal(WrappedURL.canParse('invalid'), false);
const native = URL.canParse;
vm.runInNewContext(fallback, { URL });
assert.equal(URL.canParse, native);

const html = fs.readFileSync('.next/server/app/index.html', 'utf8');
assert(!html.includes('fonts.googleapis.com'));
assert(!html.includes('fonts.gstatic.com'));
assert(!/<link[^>]+rel="stylesheet"/.test(html));
assert(/<form[^>]+action="\/library"/.test(html));
assert(/<input[^>]+name="q"/.test(html));
assert(html.includes('id="main-content"'));
const chunks = fs.readdirSync('.next/static/chunks').filter(name => name.endsWith('.js'));
for (const name of chunks) {
  const code = fs.readFileSync(`.next/static/chunks/${name}`, 'utf8');
  assert(!/String\.prototype\.trimStart=|Array\.prototype\.(flat|at)=|Object\.(fromEntries|hasOwn)=/.test(code), `Legacy polyfills returned: ${name}`);
}
console.log('Production font, CSS, native search, and polyfill checks passed.');
