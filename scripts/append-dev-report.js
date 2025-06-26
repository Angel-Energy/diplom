const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '../project-dev-report.md');
const date = new Date();
const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, '0');
const dd = String(date.getDate()).padStart(2, '0');
const today = `${yyyy}-${mm}-${dd}`;

const change = process.argv.slice(2).join(' ') || 'Автоматическое изменение (описание не указано)';

let report = fs.readFileSync(reportPath, 'utf-8');

// Находим строку с Версией 1.2.0
const versionMarker = /\*\*\d{4}-\d{2}-\d{2}\*\* — Версия 1\.2\.0 \(дата создания сайта\)/;
const match = report.match(versionMarker);
if (match) {
  const insertIdx = report.indexOf(match[0]) + match[0].length;
  const newEntry = `\n  - [${today}] ${change}`;
  report = report.slice(0, insertIdx) + newEntry + report.slice(insertIdx);
  fs.writeFileSync(reportPath, report, 'utf-8');
  console.log(`Изменение добавлено в отчет: [${today}] ${change}`);
} else {
  console.error('Не найден раздел для версии 1.2.0!');
  process.exit(1);
} 