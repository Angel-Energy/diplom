# Жизненный цикл сессии пользователя

Проект: "Сообщение 404"

Дата создания: 26 июня 2025, 10:15 AM CEST  
Версия: 1.0  
Статус: Активная разработка

---

## 📋 ОБЗОР ДИАГРАММЫ

### Назначение
Детальное описание полного жизненного цикла пользовательской сессии в игре "Сообщение 404" с учетом специфики проекта: офлайн-режим работы, локальный Ktor-сервер, соответствие 152-ФЗ, тёмная тема интерфейса и криптографическая безопасность.

### Ключевые особенности реализации
- Офлайн-first архитектура с Room Database
- Локальный Ktor-сервер для синхронизации в сети разработки
- Соответствие 152-ФЗ через AES-256 шифрование
- Тёмная тема как основной UI паттерн
- Автосохранение через WorkManager

---

## 🔄 СХЕМА ЖИЗНЕННОГО ЦИКЛА

### PlantUML диаграмма
```plantuml
@startuml Session Lifecycle - Message 404
!theme plain
skinparam backgroundColor #1e1e2e
skinparam defaultTextColor #cdd6f4
skinparam activityBackgroundColor #313244
skinparam activityBorderColor #585b70

title Жизненный цикл сессии пользователя - "Сообщение 404"

start

:Запуск приложения;
note right: Cold/Warm start
note right: Theme: Dark Mode

:Проверка сохранённой сессии;
if (Сессия существует?) then (да)
  :Валидация PIN;
  if (PIN корректный?) then (да)
    :Расшифровка данных пользователя;
    note right: AES-256 с Android Keystore
    note right: Соответствие 152-ФЗ
  else (нет)
    :Блокировка доступа;
    note right: После 3 неудачных попыток
    stop
  endif
else (нет)
  :Создание новой сессии;
  :Установка PIN;
  :Генерация ключей шифрования;
endif

:Инициализация GameEngine;
note right: Загрузка из Room Database
note right: Проверка офлайн-данных

:Проверка сетевого подключения;
if (Ktor-сервер доступен?) then (да)
  :Синхронизация с локальным сервером;
  note right: Сеть разработки
  note right: Обновление игрового состояния
else (нет)
  :Режим офлайн;
  note right: Вся функциональность доступна
endif

partition "Активная игровая сессия" {
  :Загрузка текущего дня;
  
  repeat
    :Отображение чат-интерфейса;
    note right: Jetpack Compose UI
    note right: Тёмная тема
    
    :Ожидание действий пользователя;
    
    switch (Тип действия?)
    case (Отправка сообщения)
      :Обработка в ChatViewModel;
      :Сохранение в Room;
    case (Выбор диалога)
      :Обновление игрового состояния;
      :Пересчёт параметров (trust/threat);
    case (Мини-игра)
      :Запуск MinigameActivity;
      :Обработка результатов;
    case (Настройки)
      :Переход в SettingsScreen;
    endswitch
    
    :Автосохранение прогресса;
    note right: Каждые 30 секунд
    note right: WorkManager background task
    
    if (Сетевое подключение?) then (да)
      :Фоновая синхронизация;
      note right: Ktor Client в корутине
    endif
    
  repeat while (Пользователь активен?)
}

:Завершение сессии;
note right: Кнопка выхода или система

:Финальное сохранение;
:Шифрование данных;
if (Сеть доступна?) then (да)
  :Синхронизация с сервером;
endif

:Очистка оперативной памяти;
:Закрытие соединений;

stop

@enduml
```

### Mermaid альтернатива
```mermaid
flowchart TD
    A[Запуск приложения] --> B{Сессия существует?}
    
    B -->|Да| C[Валидация PIN]
    B -->|Нет| D[Создание новой сессии]
    
    C --> E{PIN корректный?}
    E -->|Да| F[Расшифровка данных]
    E -->|Нет| G[Блокировка доступа]
    
    D --> H[Установка PIN]
    H --> I[Генерация ключей]
    
    F --> J[Инициализация GameEngine]
    I --> J
    
    J --> K{Ktor-сервер доступен?}
    K -->|Да| L[Синхронизация]
    K -->|Нет| M[Режим офлайн]
    
    L --> N[Активная сессия]
    M --> N
    
    N --> O[Чат-интерфейс]
    O --> P{Действие пользователя}
    
    P -->|Сообщение| Q[ChatViewModel]
    P -->|Диалог| R[Обновление состояния]
    P -->|Мини-игра| S[MinigameActivity]
    P -->|Настройки| T[SettingsScreen]
    
    Q --> U[Автосохранение]
    R --> U
    S --> U
    T --> U
    
    U --> V{Сеть доступна?}
    V -->|Да| W[Фоновая синхронизация]
    V -->|Нет| X[Локальное сохранение]
    
    W --> Y{Пользователь активен?}
    X --> Y
    
    Y -->|Да| O
    Y -->|Нет| Z[Завершение сессии]
    
    Z --> AA[Финальное сохранение]
    AA --> BB[Шифрование данных]
    BB --> CC[Очистка памяти]
    CC --> DD[Конец]
    
    style A fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style N fill:#2b6cb0,stroke:#3182ce,color:#e2e8f0
    style Z fill:#c53030,stroke:#e53e3e,color:#e2e8f0
```

---

## 💻 ТЕХНИЧЕСКАЯ РЕАЛИЗАЦИЯ

### Основные компоненты

#### SessionManager
```kotlin
@Singleton
class SessionManager @Inject constructor(
    private val encryptionService: EncryptionService,
    private val gameStateRepository: GameStateRepository,
    private val syncManager: OfflineSyncManager,
    private val authManager: AuthManager
) {
    // ... (см. подробную реализацию выше)
}
```

#### SessionState
```kotlin
sealed class SessionState {
    object Uninitialized : SessionState()
    object Authenticating : SessionState()
    data class Active(
        val sessionId: String,
        val gameState: GameState,
        val startTime: Long
    ) : SessionState()
    object Ended : SessionState()
}
```

#### SessionResult
```kotlin
sealed class SessionResult {
    object Success : SessionResult()
    object AuthenticationFailed : SessionResult()
    data class Error(val message: String) : SessionResult()
}
```

#### AuthManager (соответствие 152-ФЗ)
```kotlin
@Singleton
class AuthManager @Inject constructor(
    private val encryptionService: EncryptionService,
    private val secureStorage: SecureStorageManager,
    private val biometricManager: BiometricManager
) {
    // ... (см. подробную реализацию выше)
}
```

---

## Взаимодействие с командой
- Android-разработчик (Kotlin): реализует логику сессии, шифрование, автосохранение.
- Backend-разработчик: реализует Ktor-сервер и синхронизацию.
- QA-аналитик: тестирует сценарии входа, выхода, офлайн-режима.
- Технический писатель: документирует жизненный цикл.

## Кому подходит
- Для Android-разработчиков, backend-инженеров, QA и технических писателей.

## Аспекты работы
- Требует тестирования офлайн/онлайн сценариев.
- Важно обеспечить соответствие 152-ФЗ.
- Документация включает схемы и примеры кода. 