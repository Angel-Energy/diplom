#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const diagramsDir = path.join(__dirname, '..', 'diagrams');

function getAllMmdFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllMmdFiles(fullPath));
    } else if (file.endsWith('.mmd')) {
      files.push(fullPath);
    }
  });
  return files;
}

const files = getAllMmdFiles(diagramsDir);
let hasError = false;
files.forEach(file => {
  try {
    execSync(`npx mmdc -i "${file}" -o /dev/null`);
    console.log(`✅ ${file} — OK`);
  } catch (e) {
    hasError = true;
    console.error(`❌ ${file} — SYNTAX ERROR`);
  }
});
if (hasError) process.exit(1); 