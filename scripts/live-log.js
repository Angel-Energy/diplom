const fs = require('fs');
const path = require('path');

const journals = [
  'project-dev-report.md',
  'project-update-report.md',
  'CHANGELOG.md'
];
const startDate = '2025-06-22';

const { execSync } = require('child_process');
let changes = '';
try {
  changes = execSync('git diff --cached --name-status', { encoding: 'utf-8' });
} catch (e) {}

if (!changes.trim()) process.exit(0);

const now = new Date().toLocaleString('ru-RU');
const entry = `### [${now}] Изменения\n\n\

${changes.trim()}\n\n`;

journals.forEach((file) => {
  const filePath = path.join(__dirname, '..', file);
  let content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
  // Гарантируем наличие даты старта
  if (!content.includes('Дата старта проекта:')) {
    content = `**Дата старта проекта:** ${startDate}\n\n` + content;
  }
  // Вставляем entry внутрь секции LIVE_LOG
  const logStart = '<!-- LIVE_LOG_START -->';
  const logEnd = '<!-- LIVE_LOG_END -->';
  const startIdx = content.indexOf(logStart);
  const endIdx = content.indexOf(logEnd);
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = content.slice(0, startIdx + logStart.length);
    const after = content.slice(endIdx);
    content = before + '\n' + entry + after;
    fs.writeFileSync(filePath, content);
  }
}); 