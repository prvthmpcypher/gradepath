import { cp, mkdir, rm } from 'node:fs/promises';

const files = ['index.html','calculator.html','about.html','docs.html','contact.html','favicon.svg','og.svg','robots.txt','sitemap.xml'];
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets/js', { recursive: true });
await mkdir('dist/assets/style', { recursive: true });
for (const file of files) await cp(file, `dist/${file}`);
for (const file of ['calculations.js','presets.js','script.js','state.js','ui.js']) await cp(`assets/js/${file}`, `dist/assets/js/${file}`);
await cp('assets/style/style.css', 'dist/assets/style/style.css');
