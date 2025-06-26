#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Корневая папка с диаграммами
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

function checkFiles(files) {
  let allOk = true;
  files.forEach(file => {
    try {
      fs.accessSync(file, fs.constants.R_OK);
      console.log(`[OK]    ${path.relative(process.cwd(), file)}`);
    } catch (e) {
      allOk = false;
      console.error(`[ERROR] ${path.relative(process.cwd(), file)}`);
    }
  });
  if (allOk) {
    console.log(`\nВсе .mmd файлы доступны для чтения.`);
  } else {
    console.error(`\nЕсть недоступные .mmd файлы!`);
    process.exit(1);
  }
}

const files = walk(diagramsDir);
console.log(`Найдено .mmd файлов: ${files.length}`);
checkFiles(files); 