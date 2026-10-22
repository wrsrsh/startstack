// Local backports for advisories without a compatible upstream release.
// Files are replaced atomically so package-manager hard-link caches stay untouched.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const seenModules = new Set();
const seenPackages = new Set();
const patched = [];
const verify = process.argv.includes('--verify');

function replaceFile(file, content) {
  const temporary = file + '.security-' + process.pid;
  fs.writeFileSync(temporary, content);
  fs.renameSync(temporary, file);
}

function patchPackage(directory) {
  const real = fs.realpathSync(directory);
  if (!real.startsWith(root + path.sep) || seenPackages.has(real)) return;
  seenPackages.add(real);
  let metadata;
  try { metadata = JSON.parse(fs.readFileSync(path.join(real, 'package.json'), 'utf8')); }
  catch { return; }
  if (metadata.name === 'braces' && metadata.version === '3.0.3') {
    const file = path.join(real, 'lib/parse.js');
    let text = fs.readFileSync(file, 'utf8');
    if (!text.includes('SECURITY_BRACES_DEPTH')) {
      const needle = '  while (index < length) {';
      if (!text.includes(needle)) throw new Error('Unexpected braces parser; review the security backport');
      text = text.replace(needle, needle + '\n    // SECURITY_BRACES_DEPTH: CVE-2026-93687\n    if (stack.length > 128) throw new SyntaxError("Brace pattern nesting exceeds security limit");');
      replaceFile(file, text);
    }
    if (verify) {
      const braces = require(real);
      assert.deepEqual(braces.expand('file.{js,ts}'), ['file.js', 'file.ts']);
      const input = '{'.repeat(4000) + 'a,b' + '}'.repeat(4000);
      assert.throws(() => braces.compile(input), /nesting exceeds security limit/);
      assert.throws(() => braces.expand(input), /nesting exceeds security limit/);
    }
    patched.push(metadata.name + '@' + metadata.version);
  }
  if (metadata.name === 'sprintf-js' && ['1.0.3','1.1.3'].includes(metadata.version)) {
    const file = path.join(real, 'src/sprintf.js');
    let text = fs.readFileSync(file, 'utf8');
    if (!text.includes('SECURITY_SPRINTF_PRECISION')) {
      const legacy = metadata.version === '1.0.3';
      const needle = legacy ? 'match = parse_tree[i] // convenience purposes only' : 'ph = parse_tree[i] // convenience purposes only';
      if (!text.includes(needle)) throw new Error('Unexpected sprintf formatter; review the security backport');
      const precision = legacy ? 'match[7]' : 'ph.precision';
      const type = legacy ? 'match[8]' : 'ph.type';
      text = text.replace(needle, needle + '\n                // SECURITY_SPRINTF_PRECISION: bound ECMAScript numeric precision instead of aborting the caller\n                if (' + precision + ' && /^[efg]$/.test(' + type + ')) ' + precision + ' = String(Math.max(' + type + ' === "g" ? 1 : 0, Math.min(100, Number(' + precision + '))));');
      replaceFile(file, text);
    }
    if (verify) {
      const { sprintf } = require(real);
      assert.equal(sprintf('%.2f', 1.25), '1.25');
      assert.equal(sprintf('%.0f', 1.8), '2');
      for (const type of ['e','f','g']) assert.ok(sprintf('%.999999999999' + type, 1.25).length < 120);
      assert.doesNotThrow(() => sprintf('%.0g', 1.25));
    }
    patched.push(metadata.name + '@' + metadata.version);
  }
  if (metadata.name === 'decode-uri-component' && metadata.version === '0.2.2') {
    const file = path.join(real, 'index.js');
    const source = path.join(root, 'security-patches/decode-uri-component.cjs');
    const text = fs.readFileSync(source, 'utf8');
    if (!fs.readFileSync(file, 'utf8').includes('SECURITY_DECODE_LINEAR')) replaceFile(file, text);
    if (verify) {
      const decode = require(real);
      assert.equal(decode('caf%C3%A9'), 'café');
      assert.equal(decode('%F0%9F%98%80'), '😀');
      assert.equal(typeof decode('%E0%A4'.repeat(5000)), 'string');
    }
    patched.push(metadata.name + '@' + metadata.version);
  }
  walkModules(path.join(real, 'node_modules'));
  let siblings = path.dirname(real);
  if (path.basename(siblings).startsWith('@')) siblings = path.dirname(siblings);
  if (path.basename(siblings) === 'node_modules') walkModules(siblings);
}

function walkModules(directory) {
  if (!fs.existsSync(directory)) return;
  const real = fs.realpathSync(directory);
  if (seenModules.has(real)) return;
  seenModules.add(real);
  for (const entry of fs.readdirSync(real, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const target = path.join(real, entry.name);
    if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;
    if (entry.name.startsWith('@')) {
      for (const child of fs.readdirSync(target)) patchPackage(path.join(target, child));
    } else patchPackage(target);
  }
}

walkModules(path.join(root, 'node_modules'));
// Workspace dependencies can live in each app/package's node_modules.
for (const group of ['apps', 'packages']) {
  const directory = path.join(root, group);
  if (!fs.existsSync(directory)) continue;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) walkModules(path.join(directory, entry.name, 'node_modules'));
  }
}
console.log('Security dependency backports' + (verify ? ' verified' : ' applied') + ': ' + [...new Set(patched)].join(', '));
