const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const journals = [
  'project-dev-report.md',
  'project-update-report.md',
  'CHANGELOG.md'
];
const now = () => new Date().toLocaleString('ru-RU');

const logChange = (file, event) => {
  const entry = `### [${now()}] ${event}\n\n${file}\n\n`;
  journals.forEach((journal) => {
    const filePath = path.join(__dirname, '..', journal);
    let content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
    // Удаляем старую строку с датой последнего изменения
    content = content.replace(/\*\*Дата последнего изменения:.*\*\*\n?/g, '');
    // Вставляем entry внутрь секции LIVE_LOG и добавляем строку с датой последнего изменения
    const logStart = '<!-- LIVE_LOG_START -->';
    const logEnd = '<!-- LIVE_LOG_END -->';
    const startIdx = content.indexOf(logStart);
    const endIdx = content.indexOf(logEnd);
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      const before = content.slice(0, startIdx + logStart.length);
      const after = content.slice(endIdx);
      let newContent = before + `\n**Дата последнего изменения:** ${now()}**\n` + entry + after;
      fs.writeFileSync(filePath, newContent);
    }
  });
};

const watcher = chokidar.watch('.', {
  ignored: /(^|[\/\\])\..|node_modules|.next|public|scripts|package(-lock)?\.json|tsconfig\.json|README\.md/i,
  persistent: true,
  ignoreInitial: true,
  depth: 10
});

watcher
  .on('add', file => logChange(file, 'Добавлен файл'))
  .on('change', file => logChange(file, 'Изменён файл'))
  .on('unlink', file => logChange(file, 'Удалён файл'));

console.log('Live log watcher started...'); 