# 📋 ТЕХНИЧЕСКОЕ ЗАДАНИЕ

## Дизайн UI/UX интерфейса игры "Сообщение 404"

**Проект:** Интерактивная текстовая игра-детектив  
**Платформы:** Android (основная), iOS и Web (перспективные)  
**Заказчик:** Команда разработки Message 404  
**Дизайнер:** [ФИО дизайнера]  
**Дата составления:** 24 июня 2025  
**Версия ТЗ:** 2.0 (Объединенная)  
**Автор ТЗ:** Мария Игнатова

---

## Оглавление
1. [Обзор проекта](#1-обзор-проекта)
2. [Дизайн-система и визуальная концепция](#2-дизайн-система-и-визуальная-концепция)
3. [Архитектура экранов и навигация](#3-архитектура-экранов-и-навигация)
4. [Детальные требования к экранам](#4-детальные-требования-к-экранам)

---

## 🎯 1. ОБЗОР ПРОЕКТА

### 1.1 Описание концепции
> "Сообщение 404" — интерактивная детективная игра, имитирующая реальную ОС мобильного устройства. Игроки решают загадки, взаимодействуя с приложениями: мессенджерами, файловыми менеджерами, IDE, терминалом и др.

**Ключевая особенность:** Полная имитация реального мобильного интерфейса с возможностью переключения между приложениями и системными функциями.

### 1.2 Целевая аудитория
- **Основная:** IT-специалисты, программисты, студенты (18-35 лет), высокий уровень технической грамотности, ценят детали и аутентичность.
- **Вторичная:** Любители детективных игр и головоломок (16-45 лет), средний уровень технической грамотности, интерес к атмосфере.

### 1.3 Платформы и технические требования
- **Android 7.0+ (API 24+)**
  - Разрешения: 360x640 — 1440x3200 dp
  - Плотность: 160-640 dpi
  - Размеры: 5.0" — 7.0"
- **iOS 13+** (адаптация)
- **Web** (React/TypeScript)

---

## 🎨 2. ДИЗАЙН-СИСТЕМА И ВИЗУАЛЬНАЯ КОНЦЕПЦИЯ

### 2.1 Общая стилистика
- **Принцип:** Максимальная имитация реального мобильного интерфейса + киберпанк-эстетика
- **Ключевые принципы:**
  - Аутентичность (99% сходство)
  - Погружение (забыть, что это игра)
  - Функциональность (всё работает как в ОС)
  - Атмосфера (напряжение через визуал)
  - Адаптивность (разные устройства)

### 2.2 Цветовая палитра
#### Основная тема (Темная)
```css
--bg-primary: #1A1A1A;
--bg-secondary: #2D2D2D;
--bg-surface: #363636;
--accent-primary: #00BCD4;
--accent-secondary: #FF5722;
--accent-success: #4CAF50;
--text-primary: #FFFFFF;
--text-secondary: #B0BEC5;
--text-disabled: #616161;
--border: #424242;
--shadow: rgba(0,0,0,0.5);
--overlay: rgba(0,0,0,0.7);
```
#### Светлая тема (Опционально)
```css
--bg-primary-light: #FAFAFA;
--bg-secondary-light: #F5F5F5;
--bg-surface-light: #FFFFFF;
--accent-primary-light: #2196F3;
--accent-secondary-light: #FF5722;
--accent-success-light: #4CAF50;
--text-primary-light: #212121;
--text-secondary-light: #757575;
--text-disabled-light: #BDBDBD;
--border-light: #E0E0E0;
--shadow-light: rgba(0,0,0,0.1);
```
#### Специальные игровые цвета
```css
--cyber-neon: #00FFE1;
--warning-amber: #FFC107;
--error-red: #F44336;
--terminal-green: #4CAF50;
--code-blue: #2196F3;
--chat-purple: #9C27B0;
--online-green: #4CAF50;
--offline-gray: #616161;
--away-orange: #FF9800;
--busy-red: #F44336;
```

### 2.3 Типографика
- **Основные шрифты:**
  - System: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
  - Моно: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace
  - Display: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif
- **Иерархия размеров:**
  - Заголовки: .text-4xl (36px), .text-3xl (30px), .text-2xl (24px), .text-xl (20px), .text-lg (18px)
  - Текст: .text-base (16px), .text-sm (14px), .text-xs (12px)
  - Спец.: .text-code, .text-terminal, .text-button, .text-caption

### 2.4 Компонентная система
- **Кнопки:**
  - .btn-primary, .btn-secondary, .btn-ghost, .btn-danger
- **Поля ввода:**
  - .input-field (focus, placeholder)

---

## 📱 3. АРХИТЕКТУРА ЭКРАНОВ И НАВИГАЦИЯ

### 3.1 Структура приложения
- **Главный экран (Система Android):**
  - Lock Screen, Home Screen, Messenger, IDE/Code Editor, File Manager, Terminal, Game Hub, System Settings
- **Ключевые приложения:**
  - 💬 Messenger (чаты, контакты)
  - 💻 IDE/Code Editor (VS Code)
  - 📁 File Manager
  - 💻 Terminal
  - 🎮 Game Hub
  - ⚙️ System Settings

### 3.2 Навигационные паттерны
- Gesture Navigation (Android 10+)
- 3-Button Navigation (старые устройства)
- Back Stack (корректная работа "Назад")
- Tab Navigation, Drawer Navigation, Stack Navigation
- Quick Settings, Notification Panel, Long Press, Swipe Actions

---

## 🖥️ 4. ДЕТАЛЬНЫЕ ТРЕБОВАНИЯ К ЭКРАНАМ

### 4.1 Lock Screen
- Время, дата, уведомления, индикаторы статуса
- Методы разблокировки: PIN, паттерн, биометрия
- Быстрый доступ: камера, телефон
- Особые состояния: новое уведомление, неверный PIN, критическое сообщение

### 4.2 Home Screen
- Сетка приложений (4x6/5x6), виджеты, док, папки, поиск
- Интерактивные элементы: long press, gestures, анимации

### 4.3 Chat Interface (Messenger)
- **Chat List:**
  - Header, статус, chat items, разделители, empty/loading states
- **Chat Screen:**
  - Header, сообщения (incoming/outgoing), attachments, system messages, date separators, typing indicator, selection mode, input area, emoji picker, voice recording
- **Анимации:**
  - message-send, typing-dots, file-upload-progress

### 4.4 VS Code Interface
- Подсветка синтаксиса, номера строк, файловый проводник, панель проблем, терминал, поиск/замена, мини-карта
- Layout: Top Bar, Side Panel, Editor Area, Tab Bar, Breadcrumb Bar, Editor Content, Scrollbars

---

## 📝 Примечания
- Все компоненты должны быть адаптивными и поддерживать тёмную/светлую тему
- Анимации — плавные, не мешающие восприятию
- Все элементы должны быть доступны для пользователей с ограниченными возможностями
- UI должен быть протестирован на разных устройствах и плотностях экранов

---

**Документ поддерживается в актуальном состоянии. Все изменения согласовываются с командой разработки и дизайнером.** 