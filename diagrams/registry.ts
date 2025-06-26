// Тип для диаграммы
export interface Diagram {
  id: string;
  category: string;
  title: string;
  file: string;
  description: string;
  tags?: string[];
  conclusion?: string;
  mdFile: string;
}

export const diagrams: Diagram[] = [
  // Архитектурные диаграммы
  { id: "mvvm-chat", category: "architecture", title: "MVVM-структура чата", file: "architecture/mvvm-chat.mmd", description: "Слои: View (Compose), ViewModel (состояние чата), Repository (данные)", mdFile: "architecture/mvvm-chat.md" },
  { id: "encryption-flow", category: "architecture", title: "Поток данных шифрования", file: "architecture/encryption-flow.mmd", description: "Клиент → AES-256 → Сервер → SQLCipher", mdFile: "architecture/encryption-flow.md" },
  { id: "game-logic-classes", category: "architecture", title: "Диаграмма классов игровой логики", file: "architecture/game-logic-classes.mmd", description: "Классы: Player, Dialogue, GameDay", mdFile: "architecture/game-logic-classes.md" },
  { id: "app-modules", category: "architecture", title: "Модули приложения", file: "architecture/app-modules.mmd", description: "UI, Logic, Data, Security слои", mdFile: "architecture/app-modules.md" },
  { id: "compose-animations", category: "architecture", title: "Интеграция Jetpack Compose с анимациями", file: "architecture/compose-animations.mmd", description: "Composables для чата и глич-эффектов", mdFile: "architecture/compose-animations.md" },
  { id: "system-context", category: "architecture", title: "Общая схема клиент-серверной системы", file: "architecture/system-context.mmd", description: "Android-клиент, Ktor-сервер, MySQL", mdFile: "architecture/system-context.md" },

  // Диаграммы данных
  { id: "progress-db", category: "data", title: "Схема базы данных прогресса", file: "data/progress-db.mmd", description: "Таблицы: users, game_states, dialogues", mdFile: "data/progress-db.md" },
  { id: "player-json", category: "data", title: "JSON-структура состояния игрока", file: "data/player-json.mmd", description: "{\"day\": 1, \"trust\": 50, \"choices\": [\"hide\"]}", mdFile: "data/player-json.md" },
  { id: "offline-sync", category: "data", title: "Синхронизация оффлайн-прогресса", file: "data/offline-sync.mmd", description: "Локальное хранение → синхронизация при подключении", mdFile: "data/offline-sync.md" },
  { id: "minigame-model", category: "data", title: "Модель данных мини-игры (расшифровка)", file: "data/minigame-model.mmd", description: "Задача, подсказка, ответ", mdFile: "data/minigame-model.md" },
  { id: "flags-store", category: "data", title: "Хранилище флагов выбора", file: "data/flags-store.mmd", description: "Доверие, угроза, доступ к информации", mdFile: "data/flags-store.md" },

  // Игровые диаграммы
  { id: "day1-tree", category: "game", title: "Дерево сюжета первого дня", file: "game/day1-tree.mmd", description: "Развилки: 'Скрыть' vs 'Сообщить Максиму'", mdFile: "game/day1-tree.md" },
  { id: "minigame-flow", category: "game", title: "Схема мини-игры (поиск ошибок)", file: "game/minigame-flow.mmd", description: "Ввод кода → валидация → результат", mdFile: "game/minigame-flow.md" },
  { id: "endings", category: "game", title: "Возможные концовки", file: "game/endings.mmd", description: "3 варианта: разоблачение, провал, нейтралитет", mdFile: "game/endings.md" },
  { id: "elena-relationship", category: "game", title: "Динамика отношений с Еленой", file: "game/elena-relationship.mmd", description: "Изменение доверия по выборам", mdFile: "game/elena-relationship.md" },
  { id: "progress-map", category: "game", title: "Карта прогресса (День 1-3)", file: "game/progress-map.mmd", description: "Этапы: чат → мини-игра → новый день", mdFile: "game/progress-map.md" },

  // Диаграммы поведения
  { id: "chat-uml", category: "behavior", title: "UML-классы чата", file: "behavior/chat-uml.mmd", description: "ChatViewModel, Message, Choice", mdFile: "behavior/chat-uml.md" },
  { id: "day-states", category: "behavior", title: "Состояния игрового дня", file: "behavior/day-states.mmd", description: "Начало → диалог → выбор → мини-игра → конец дня", mdFile: "behavior/day-states.md" },
  { id: "progress-request-seq", category: "behavior", title: "Последовательность запроса прогресса", file: "behavior/progress-request-seq.mmd", description: "Клиент → сервер → возврат данных", mdFile: "behavior/progress-request-seq.md" },
  { id: "chat-choice-activity", category: "behavior", title: "Активность выбора в чате", file: "behavior/chat-choice-activity.mmd", description: "Поток: сообщение → варианты → обновление состояния", mdFile: "behavior/chat-choice-activity.md" },
  { id: "invisible-sender", category: "behavior", title: "Взаимодействие с невидимым отправителем", file: "behavior/invisible-sender.mmd", description: "Игрок → анонимные подсказки", mdFile: "behavior/invisible-sender.md" },
  { id: "notification-events", category: "behavior", title: "События уведомлений", file: "behavior/notification-events.mmd", description: "Получение сообщения → глич-эффект → звук", mdFile: "behavior/notification-events.md" },

  // Диаграммы безопасности
  { id: "aes-chat", category: "security", title: "Схема AES-256 для чата", file: "security/aes-chat.mmd", description: "Генерация ключа → шифрование сообщений", mdFile: "security/aes-chat.md" },
  { id: "tls-sequence", category: "security", title: "Конфигурация TLS для сервера", file: "security/tls-sequence.mmd", description: "Сертификат → шифрованный канал", mdFile: "security/tls-sequence.md" },
  { id: "apk-obfuscation", category: "security", title: "Обфускация APK", file: "security/apk-obfuscation.mmd", description: "ProGuard правила для защиты кода", mdFile: "security/apk-obfuscation.md" },
  { id: "sqlcipher-db", category: "security", title: "SQLCipher шифрование базы", file: "security/sqlcipher-db.mmd", description: "Ключ → зашифрованные данные", mdFile: "security/sqlcipher-db.md" },
  { id: "jwt-auth", category: "security", title: "Аутентификация токеном", file: "security/jwt-auth.mmd", description: "JWT для доступа к эндпоинтам", mdFile: "security/jwt-auth.md" },
  { id: "player-data-protection", category: "security", title: "Поток защиты данных игрока", file: "security/player-data-protection.mmd", description: "Шифрование → хранение → синхронизация", mdFile: "security/player-data-protection.md" },

  // Диаграммы API
  { id: "progress-rest", category: "api", title: "REST эндпоинты прогресса", file: "api/progress-rest.mmd", description: "/progress, /choices (GET/POST)", mdFile: "api/progress-rest.md" },
  { id: "auth-flow", category: "api", title: "Аутентификационный поток", file: "api/auth-flow.mmd", description: "Логин → токен → доступ", mdFile: "api/auth-flow.md" },
  { id: "minigame-request", category: "api", title: "Пример запроса/ответа мини-игры", file: "api/minigame-request.mmd", description: "JSON задачи → JSON результата", mdFile: "api/minigame-request.md" },
  { id: "ktor-routing", category: "api", title: "Маршрутизация Ktor", file: "api/ktor-routing.mmd", description: "Эндпоинты для чата и валидации", mdFile: "api/ktor-routing.md" },

  // UI/UX диаграммы
  { id: "screen-navigation", category: "ui", title: "Навигация по экранам", file: "ui/screen-navigation.mmd", description: "LockScreen → HomeScreen → ChatScreen", mdFile: "ui/screen-navigation.md" },
  { id: "chat-adaptivity", category: "ui", title: "Адаптивность чата", file: "ui/chat-adaptivity.mmd", description: "Размеры 480x800 и 1080x1920", mdFile: "ui/chat-adaptivity.md" },
  { id: "glitch-animation", category: "ui", title: "Анимация глич-эффекта", file: "ui/glitch-animation.mmd", description: "Искажение текста (200 мс)", mdFile: "ui/glitch-animation.md" },
  { id: "chat-layout", category: "ui", title: "Макет интерфейса чата", file: "ui/chat-layout.mmd", description: "Пузыри, поле ввода, кнопки выбора", mdFile: "ui/chat-layout.md" },
  { id: "user-journey-day1", category: "ui", title: "Пользовательский путь (День 1)", file: "ui/user-journey-day1.mmd", description: "Вход → чат с Максимом → выбор", mdFile: "ui/user-journey-day1.md" },
  { id: "talkback-map", category: "ui", title: "Карта доступности TalkBack", file: "ui/talkback-map.mmd", description: "Голосовое описание элементов", mdFile: "ui/talkback-map.md" },

  // Инфраструктурные диаграммы
  { id: "server-deploy", category: "infrastructure", title: "Схема развертывания сервера", file: "infrastructure/server-deploy.mmd", description: "Ktor + MySQL на VPS", mdFile: "infrastructure/server-deploy.md" },
  { id: "encrypted-network", category: "infrastructure", title: "Сеть с шифрованием", file: "infrastructure/encrypted-network.mmd", description: "Клиент → TLS → сервер", mdFile: "infrastructure/encrypted-network.md" },
  { id: "scaling-model", category: "infrastructure", title: "Модель масштабирования", file: "infrastructure/scaling-model.mmd", description: "До 10k пользователей с балансировкой", mdFile: "infrastructure/scaling-model.md" },
  { id: "progress-backup", category: "infrastructure", title: "Бэкап данных прогресса", file: "infrastructure/progress-backup.mmd", description: "Автоматическое сохранение на сервер", mdFile: "infrastructure/progress-backup.md" },
  { id: "server-monitoring", category: "infrastructure", title: "Мониторинг сервера", file: "infrastructure/server-monitoring.mmd", description: "Логи, аптайм", mdFile: "infrastructure/server-monitoring.md" },

  // Диаграммы тестирования
  { id: "unit-test-flow", category: "testing", title: "План Unit-тестов ViewModel", file: "testing/unit-test-flow.mmd", description: "Тестирование updateMessage", mdFile: "testing/unit-test-flow.md" },
  { id: "chat-integration", category: "testing", title: "Схема интеграции чата и сервера", file: "testing/chat-integration.mmd", description: "Тестирование эндпоинтов", mdFile: "testing/chat-integration.md" },
  { id: "aes-test", category: "testing", title: "Тестирование шифрования AES-256", file: "testing/aes-test.mmd", description: "Проверка целостности данных", mdFile: "testing/aes-test.md" },
  { id: "stress-screens", category: "testing", title: "Стресс-тест переключения экранов", file: "testing/stress-screens.mmd", description: "50 итераций без крашей", mdFile: "testing/stress-screens.md" },
  { id: "coverage-matrix", category: "testing", title: "Матрица покрытия сценариев", file: "testing/coverage-matrix.mmd", description: "Все ветвления Дня 1", mdFile: "testing/coverage-matrix.md" },
  { id: "regression-choices", category: "testing", title: "Регрессионное тестирование выборов", file: "testing/regression-choices.mmd", description: "Проверка после исправлений", mdFile: "testing/regression-choices.md" },
  { id: "performance-test", category: "testing", title: "Тестирование производительности", file: "testing/performance-test.mmd", description: "FPS и память на Snapdragon 625", mdFile: "testing/performance-test.md" },
  { id: "minigame-validation", category: "testing", title: "Валидация мини-игры (расшифровка)", file: "testing/minigame-validation.mmd", description: "Корректность ответа", mdFile: "testing/minigame-validation.md" },
  { id: "ab-test-buttons", category: "testing", title: "A/B-тест кнопок выбора", file: "testing/ab-test-buttons.mmd", description: "Два дизайна на удержание", mdFile: "testing/ab-test-buttons.md" },
  { id: "bug-map", category: "testing", title: "Карта баг-репортов", file: "testing/bug-map.mmd", description: "Приоритеты и статусы", mdFile: "testing/bug-map.md" },

  // Жизненные циклы
  { id: "dev-lifecycle", category: "lifecycle", title: "Жизненный цикл разработки", file: "lifecycle/dev-lifecycle.mmd", description: "Планирование → релиз (5 августа 2025)", mdFile: "lifecycle/dev-lifecycle.md" },
  { id: "game-day-cycle", category: "lifecycle", title: "Цикл игрового дня", file: "lifecycle/game-day-cycle.mmd", description: "Чат → мини-игра → сохранение", mdFile: "lifecycle/game-day-cycle.md" },
  { id: "session-lifecycle", category: "lifecycle", title: "Жизненный цикл сессии пользователя", file: "lifecycle/session-lifecycle.mmd", description: "Аутентификация через PIN, активность: чат и мини-игры, выход: автосохранение и синхронизация.", mdFile: "lifecycle/session-lifecycle.md" },
  { id: "server-update-cycle", category: "lifecycle", title: "Цикл обновления сервера", file: "lifecycle/server-update-cycle.mmd", description: "Патчи → тестирование → деплой", mdFile: "lifecycle/server-update-cycle.md" },

  // Другие диаграммы
  { id: "roadmap", category: "other", title: "Roadmap проекта", file: "other/roadmap.mmd", description: "Этапы до декабря 2025", mdFile: "other/roadmap.md" },
  { id: "team-structure", category: "other", title: "Структура команды", file: "other/team-structure.mmd", description: "Роли: разработчики, дизайнеры, тестировщики", mdFile: "other/team-structure.md" },
  { id: "git-schema", category: "other", title: "Схема Git-репозитория", file: "other/git-schema.mmd", description: "Main, develop, feature-ветки", mdFile: "other/git-schema.md" },
  { id: "compliance", category: "other", title: "Диаграмма compliance", file: "other/compliance.mmd", description: "152-ФЗ и ГОСТ Р 34.12-2015", mdFile: "other/compliance.md" },
]

export const categoryTitlesRu: Record<string, string> = {
  architecture: 'Архитектура',
  data: 'Данные',
  game: 'Игровые механики',
  ui: 'UI/UX',
  infrastructure: 'Инфраструктура',
  dynamic: 'Динамические',
  behavior: 'Поведение',
  security: 'Безопасность',
  testing: 'Тестирование',
  lifecycle: 'Жизненные циклы',
  api: 'API',
  other: 'Прочее'
}

export function getDiagramById(id: string) {
  return diagrams.find(d => d.id === id)
}

export function getCategoryById(category: string) {
  const found = diagrams.find(d => d.category === category)
  if (!found) return null
  return {
    id: found.category,
    title: categoryTitlesRu[category] || (category.charAt(0).toUpperCase() + category.slice(1)),
  }
}

export function getAllDiagrams(): Diagram[] {
  return diagrams
}

export const diagramCategories = Array.from(
  diagrams.reduce((map, d) => {
    if (!map.has(d.category)) {
      map.set(d.category, { id: d.category, title: categoryTitlesRu[d.category] || (d.category.charAt(0).toUpperCase() + d.category.slice(1)), diagrams: [] });
    }
    const cat = map.get(d.category);
    if (cat) {
      cat.diagrams.push(d);
    }
    return map;
  }, new Map<string, { id: string; title: string; diagrams: Diagram[] }>() ).values()
);

// DEBUG: Список всех id и файлов диаграмм
console.log(diagrams.map(d => `${d.id}: ${d.file}`).join('\n'));

export function getRelatedDiagrams(diagramId: string) {
  const diagram = diagrams.find(d => d.id === diagramId)
  if (!diagram) return []
  // Пример: связанные диаграммы — из той же категории, кроме самой себя
  return diagrams.filter(d => d.category === diagram.category && d.id !== diagramId)
}

export function getCategoryDescriptions(): Record<string, string> {
  return categoryDescriptions
}

export const categoryDescriptions: Record<string, string> = {
  architecture: `Архитектурные диаграммы отражают структуру, взаимодействие и разделение ответственности между основными компонентами мобильной игры «Сообщение 404». Охватывают слои MVVM, Clean Architecture, интеграцию Jetpack Compose, работу с Room, Ktor, Chaquopy и организацию клиент-серверного взаимодействия.\n\n- **Назначение:** Формализовать архитектуру приложения, упростить навигацию по коду, обеспечить масштабируемость и безопасность.\n- **Аспекты:** Слои Presentation/Domain/Data, взаимодействие с сервером, офлайн-режим, шифрование, модульность, поддержка тёмной темы.\n- **Роли:** Архитектор, Android-разработчик, DevOps, UI/UX-дизайнер, специалист по безопасности.\n- **Рекомендации:** Использовать при проектировании новых фич, ревью архитектуры, обучении новых участников команды.\n- **Для кого:** Разработчики, архитекторы, тестировщики, технические писатели.\n- **Стандарты:** Clean Architecture, MVVM, ГОСТ 19.701-90, ISO/IEC 25010, 27001.`,
  data: `Диаграммы данных описывают структуру хранения, сериализации и синхронизации данных игрока, прогресса, мини-игр и флагов.\n\n- **Назначение:** Формализовать структуру БД, JSON, офлайн-синхронизацию.\n- **Аспекты:** Room, SQLCipher, JSON, офлайн-режим, миграции.\n- **Роли:** Android-разработчик, архитектор, специалист по данным.\n- **Рекомендации:** Использовать при проектировании моделей, миграциях, аудите безопасности.\n- **Для кого:** Разработчики, аналитики, тестировщики.\n- **Стандарты:** ГОСТ 19.701-90, 152-ФЗ, SQLCipher.`,
  game: `Игровые диаграммы визуализируют сюжетные ветвления, мини-игры, концовки и динамику отношений персонажей.\n\n- **Назначение:** Упростить проектирование и тестирование сценариев.\n- **Аспекты:** Ветвления, условия, прогресс, мини-игры.\n- **Роли:** Геймдизайнер, сценарист, Android-разработчик.\n- **Рекомендации:** Использовать при разработке новых глав, тестировании концовок.\n- **Для кого:** Геймдизайнеры, сценаристы, QA.\n- **Стандарты:** Narrative Design, ISO/IEC 25010.`,
  behavior: `Диаграммы поведения описывают сценарии, состояния, последовательности и активности пользователя в чате и мини-играх.\n\n- **Назначение:** Формализовать пользовательские сценарии, выявить узкие места.\n- **Аспекты:** Сценарии, состояния, push-уведомления, выборы.\n- **Роли:** Android-разработчик, QA, UI/UX-дизайнер.\n- **Рекомендации:** Использовать при тестировании, проектировании UX.\n- **Для кого:** Разработчики, тестировщики, дизайнеры.\n- **Стандарты:** UML, ГОСТ 19.701-90.`,
  security: `Диаграммы безопасности показывают архитектуру защиты данных, шифрование, аутентификацию, обфускацию и соответствие стандартам.\n\n- **Назначение:** Обеспечить защиту данных, соответствие 152-ФЗ, OWASP.\n- **Аспекты:** AES, TLS, JWT, SQLCipher, обфускация, защита персональных данных.\n- **Роли:** Специалист по безопасности, Android-разработчик, DevOps.\n- **Рекомендации:** Использовать при аудите, внедрении новых механизмов защиты.\n- **Для кого:** Разработчики, специалисты по безопасности, аудиторы.\n- **Стандарты:** 152-ФЗ, OWASP Mobile Top 10, ГОСТ Р 34.12-2015.`,
  api: `Диаграммы API описывают REST и RPC-интерфейсы, маршрутизацию, примеры запросов/ответов, интеграцию с сервером Ktor.\n\n- **Назначение:** Формализовать API, упростить интеграцию и тестирование.\n- **Аспекты:** REST, Ktor, сериализация, безопасность.\n- **Роли:** Backend, Android-разработчик, QA.\n- **Рекомендации:** Использовать при интеграции, написании автотестов.\n- **Для кого:** Разработчики, тестировщики, интеграторы.\n- **Стандарты:** REST, OpenAPI, Ktor.`,
  ui: `UI/UX диаграммы иллюстрируют макеты, навигацию, анимации, адаптивность и доступность интерфейса.\n\n- **Назначение:** Обеспечить удобство, доступность и визуальную целостность интерфейса.\n- **Аспекты:** Jetpack Compose, Material 3, TalkBack, анимации, адаптивность.\n- **Роли:** UI/UX-дизайнер, Android-разработчик, QA.\n- **Рекомендации:** Использовать при проектировании новых экранов, тестировании доступности.\n- **Для кого:** Дизайнеры, разработчики, тестировщики.\n- **Стандарты:** Material Design, WCAG.`,
  infrastructure: `Инфраструктурные диаграммы описывают развертывание, мониторинг, масштабирование, резервное копирование и сетевую архитектуру.\n\n- **Назначение:** Обеспечить надёжность, масштабируемость и мониторинг системы.\n- **Аспекты:** Сервер, сеть, мониторинг, бэкапы, масштабирование.\n- **Роли:** DevOps, Backend, Android-разработчик.\n- **Рекомендации:** Использовать при деплое, настройке мониторинга, планировании роста.\n- **Для кого:** DevOps, разработчики, администраторы.\n- **Стандарты:** ISO/IEC 27001, Prometheus.`,
  testing: `Диаграммы тестирования охватывают unit, интеграционные, регрессионные, стресс- и A/B-тесты, а также покрытие сценариев.\n\n- **Назначение:** Формализовать процессы тестирования, повысить качество ПО.\n- **Аспекты:** Unit, интеграция, регрессия, стресс, покрытие, баги.\n- **Роли:** QA, Android-разработчик, DevOps.\n- **Рекомендации:** Использовать при планировании и автоматизации тестирования.\n- **Для кого:** Тестировщики, разработчики, аналитики.\n- **Стандарты:** ISO/IEC 25010, TMMi.`,
  lifecycle: `Диаграммы жизненных циклов показывают этапы разработки, игровые сессии, обновления сервера и пользовательские сценарии.\n\n- **Назначение:** Визуализировать жизненные циклы для оптимизации процессов и тестирования.\n- **Аспекты:** Разработка, игровые сессии, обновления, автосохранение, офлайн-режим.\n- **Роли:** Android-разработчик, QA, DevOps, аналитик.\n- **Рекомендации:** Использовать при оптимизации процессов, обучении, тестировании.\n- **Для кого:** Разработчики, тестировщики, аналитики.\n- **Стандарты:** Agile, ISO/IEC 12207.`,
  other: `Прочие диаграммы включают roadmap, структуру команды, git-схему, compliance и другие организационные аспекты.\n\n- **Назначение:** Описать организацию, планирование и соответствие стандартам.\n- **Аспекты:** Roadmap, структура, git, compliance.\n- **Роли:** Руководитель, архитектор, технический писатель.\n- **Рекомендации:** Использовать при планировании, аудите, обучении.\n- **Для кого:** Руководители, архитекторы, писатели.\n- **Стандарты:** Agile, ISO/IEC 27001.`
} 