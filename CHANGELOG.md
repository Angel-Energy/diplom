# Changelog

## [1.1.0] - 2024-12-19

### ✅ Добавлено
- Единообразная темная тема для всех диаграмм Mermaid
- Улучшенная обработка ошибок в компоненте MermaidDiagram
- Подробная документация в README.md
- Улучшенная типизация ошибок

### 🔧 Изменено
- **Убран SwaggerHub Editor** - удалена кнопка и функция `handleOpenSwaggerHub` из страницы API
- **Улучшен компонент MermaidDiagram**:
  - Добавлена единая темная тема с цветовой схемой проекта
  - Улучшена инициализация Mermaid с детальными настройками
  - Добавлены стили для всех типов диаграмм (flowchart, sequence, state, gantt, journey, pie, er, gitGraph)
  - Улучшена обработка ошибок с детальными сообщениями
  - Добавлены единообразные стили для текста и SVG элементов
  - Улучшена загрузка с анимацией

### 🎨 Стилизация
- **Цветовая схема диаграмм**:
  - Основной цвет: `#06b6d4` (cyan)
  - Вторичный цвет: `#8b5cf6` (purple)
  - Фон: `#0f172a` (slate-900)
  - Текст: `#e2e8f0` (slate-200)
  - Границы: `#475569` и `#64748b`
  - Состояния: красный для ошибок, зеленый для успеха, оранжевый для предупреждений

### 📚 Документация
- Создан подробный README.md с инструкциями по установке и запуску
- Добавлено описание структуры документации
- Описаны особенности единообразных диаграмм
- Добавлены инструкции по развертыванию

### 🐛 Исправлено
- Убраны ссылки на внешний SwaggerHub Editor
- Исправлена типизация ошибок в MermaidDiagram
- Улучшена стабильность рендеринга диаграмм

### 🔄 Технические улучшения
- Единая инициализация Mermaid для всех диаграмм
- Уникальные ID для каждой диаграммы
- Улучшенная обработка состояния загрузки
- Оптимизированные настройки для всех типов диаграмм

---

## [1.0.0] - Исходная версия

### ✅ Базовая функциональность
- 58 диаграмм Mermaid.js
- API документация с OpenAPI 3.0
- Адаптивный дизайн
- Темная тема
- Мобильная навигация 