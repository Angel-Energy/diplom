#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const diagramsDir = path.join(__dirname, '..', 'diagrams');

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, filelist);
    } else if (file.endsWith('.mmd')) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

const files = walk(diagramsDir);

console.log('| Категория | Имя файла | Путь |');
console.log('|-----------|-----------|------|');
files.forEach(file => {
  const rel = path.relative(diagramsDir, file);
  const [category, ...rest] = rel.split(path.sep);
  const name = rest.join('/');
  console.log(`| ${category} | ${name} | diagrams/${category}/${name} |`);
}); 