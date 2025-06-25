# 📊 Диаграммы системы «Сообщение 404»

Код документа: СХ-10  
Дата: 22.06.2025  
Разработчик: Иванов И.И.  
Согласовал: Петров П.П.  

## 1. Обзор
Документ содержит архитектурные диаграммы для мобильной игры «Сообщение 404», созданные в формате Mermaid.js для рендеринга в GitHub, Notion и Mermaid Live Editor. Диаграммы соответствуют ГОСТ 19.701-90, ISO/IEC 12207, 25010, 27001, ФЗ-152, ГОСТ Р 34.12-2015 и OWASP Mobile Top 10, учитывая специфику проекта: текстовый квест для Android с оффлайн-режимом, локальным Ktor-сервером (192.168.137.1:8080), шифрованием AES-256/TLS 1.2+, анонимными идентификаторами, Jetpack Compose, MVVM, тёмной темой и мини-играми на Python (Chaquopy).

## 2. Архитектурные диаграммы

### 2.1 Component Diagram
- **Назначение**: Детализирует взаимодействие компонентов MVVM (Presentation, Domain, Data) с учётом Jetpack Compose, Room, Ktor и Chaquopy. Показывает, как данные проходят от UI к локальному хранилищу и серверу.
- **Аспект**: Архитектура, взаимодействие компонентов.
- **Детали**:
  - **Presentation Layer**: Jetpack Compose (ChatScreen, ChoiceScreen, MiniGameScreen), ViewModel (ChatViewModel, GameViewModel), UI-события.
  - **Domain Layer**: UseCase (LoadDialogUseCase, SaveProgressUseCase), бизнес-логика (флаги `elena_trust`, `maxim_threat`).
  - **Data Layer**: Repositories (DialogRepository, GameRepository), Room (AES-256, SQLCipher), Ktor Client (TLS 1.2+), Chaquopy для мини-игр.
  - **Потоки данных**: UI → ViewModel → UseCase → Repository → Room/Ktor.
- **Код Mermaid.js**:
```mermaid
graph TD
    subgraph Presentation Layer
        A1[ChatScreen: Compose] --> A2[ChatViewModel]
        A1 --> A3[ChoiceScreen: Compose]
        A3 --> A4[GameViewModel]
        A1 --> A5[MiniGameScreen: Compose]
        A5 --> A6[MiniGameViewModel]
    end
    subgraph Domain Layer
        B1[LoadDialogUseCase] --> B2[SaveProgressUseCase]
        B1 --> B3[UpdateFlagsUseCase]
        B2 --> B3
    end
    subgraph Data Layer
        C1[DialogRepository] --> C2[Room: AES-256, SQLCipher]
        C1 --> C3[Ktor Client: TLS 1.2+]
        C3 --> C4[Local Server: 192.168.137.1:8080]
        C4 --> C5[MySQL: XAMPP]
        C1 --> C6[Chaquopy: Python Validator]
    end
    A2 --> B1
    A4 --> B2
    A6 --> B3
    B1 --> C1
    B2 --> C1
    B3 --> C1
    style A1 fill:#1E3A8A,stroke:#000000
    style A2 fill:#1E3A8A,stroke:#000000
    style A3 fill:#1E3A8A,stroke:#000000
    style A4 fill:#1E3A8A,stroke:#000000
    style A5 fill:#1E3A8A,stroke:#000000
    style A6 fill:#1E3A8A,stroke:#000000
    style B1 fill:#7C3AED,stroke:#000000
    style B2 fill:#7C3AED,stroke:#000000
    style B3 fill:#7C3AED,stroke:#000000
    style C1 fill:#9333EA,stroke:#000000
    style C2 fill:#9333EA,stroke:#000000
    style C3 fill:#9333EA,stroke:#000000
    style C4 fill:#2563EB,stroke:#000000
    style C5 fill:#2563EB,stroke:#000000
    style C6 fill:#9333EA,stroke:#000000
```

### 2.2 Layered Architecture
- **Назначение**: Иллюстрирует слои Clean Architecture (Presentation, Domain, Data) с указанием технологий и зависимостей. Показывает разделение ответственности.
- **Аспект**: Архитектура, организация кода.
- **Детали**:
  - **Presentation Layer**: Jetpack Compose (UI), ViewModel (логика UI), Material 3 (тёмная тема), TalkBack.
  - **Domain Layer**: UseCase (бизнес-логика), Models (GameState, Message, Option), независимость от фреймворков.
  - **Data Layer**: Repositories (интерфейсы), Room (локальное хранилище, AES-256), Ktor Client (сеть, TLS 1.2+), Chaquopy (мини-игры).
  - **Зависимости**: Однонаправленные (Presentation → Domain → Data).
  - **Оффлайн-режим**: Room обеспечивает локальное хранение, WorkManager синхронизирует прогресс.
- **Код Mermaid.js**:
```mermaid
graph TD
    subgraph Presentation Layer
        A1[UI: Jetpack Compose, Material 3, TalkBack]
        A2[ViewModel: ChatViewModel, GameViewModel]
        A1 --> A2
    end
    subgraph Domain Layer
        B1[UseCase: LoadDialogUseCase, SaveProgressUseCase]
        B2[Models: GameState, Message, Option]
        B1 --> B2
    end
    subgraph Data Layer
        C1[Repositories: DialogRepository, GameRepository]
        C2[Local: Room, AES-256, SQLCipher]
        C3[Remote: Ktor Client, TLS 1.2+]
        C4[Python: Chaquopy]
        C1 --> C2
        C1 --> C3
        C1 --> C4
        C3 --> C5[Local Server: 192.168.137.1:8080]
        C5 --> C6[MySQL: XAMPP]
    end
    A2 --> B1
    B1 --> C1
    style A1 fill:#1E3A8A,stroke:#000000
    style A2 fill:#1E3A8A,stroke:#000000
    style B1 fill:#7C3AED,stroke:#000000
    style B2 fill:#7C3AED,stroke:#000000
    style C1 fill:#9333EA,stroke:#000000
    style C2 fill:#9333EA,stroke:#000000
    style C3 fill:#9333EA,stroke:#000000
    style C4 fill:#9333EA,stroke:#000000
    style C5 fill:#2563EB,stroke:#000000
    style C6 fill:#2563EB,stroke:#000000
```

### 2.3 Class Diagram
- **Назначение**: Детализирует ключевые классы (`Message`, `GameState`, `Option`, `ChatViewModel`, `DialogRepository`) с атрибутами, методами и связями. Показывает структуру данных и логику.
- **Аспект**: Архитектура, данные.
- **Детали**:
  - **Message**: Сообщение в чате (id, dialogId, text, sender, timestamp).
  - **GameState**: Состояние игры (userId=ANON_<UUID>, currentDay, flags: `elena_trust`, `maxim_threat`).
  - **Option**: Выбор игрока (id, text, nextDialogId, flagChanges).
  - **ChatViewModel**: Управляет UI чата (MutableStateFlow<Dialog>, методы загрузки).
  - **DialogRepository**: Интерфейс для доступа к данным (Room, Ktor, Chaquopy).
  - **Связи**: Message и Option связаны с GameState, ChatViewModel зависит от DialogRepository.
- **Код Mermaid.js**:
```mermaid
classDiagram
    class Message {
        +String id
        +String dialogId
        +String text
        +String sender
        +Long timestamp
        +toJson(): String
    }
    class GameState {
        +String userId "ANON_<UUID>"
        +Int currentDay
        +Map<String, Int> flags "elena_trust, maxim_threat"
        +updateFlags(changes: Map<String, Int>)
        +saveToRoom()
    }
    class Option {
        +String id
        +String text
        +String nextDialogId
        +Map<String, Int> flagChanges
        +applyChanges(state: GameState)
    }
    class ChatViewModel {
        +MutableStateFlow<Dialog> dialog
        +loadDialog(dialogId: String)
        +selectOption(optionId: String)
        +executeMiniGame(code: String)
    }
    class DialogRepository {
        +getDialog(dialogId: String): Dialog
        +saveProgress(state: GameState)
        +validateCode(code: String): Boolean
    }
    Message --> GameState : belongs to
    Option --> GameState : updates
    ChatViewModel --> DialogRepository : depends on
    DialogRepository --> GameState : manages
```

### 2.4 Package Diagram
- **Назначение**: Показывает организацию Kotlin-пакетов и их подмодули. Упрощает навигацию по кодовой базе.
- **Аспект**: Архитектура, организация проекта.
- **Детали**:
  - **com.message404**: Корневой пакет.
  - **presentation**: Подпакеты `ui` (Compose-компоненты), `viewmodel` (ViewModel).
  - **domain**: Подпакеты `usecase` (UseCase), `model` (модели данных).
  - **data**: Подпакеты `repository` (интерфейсы), `local` (Room), `remote` (Ktor), `python` (Chaquopy).
  - **Зависимости**: presentation → domain → data, без обратных связей.
- **Код Mermaid.js**:
```mermaid
graph TD
    A[com.message404] --> B[presentation]
    A --> C[domain]
    A --> D[data]
    B --> E[ui: ChatScreen, ChoiceScreen]
    B --> F[viewmodel: ChatViewModel, GameViewModel]
    C --> G[usecase: LoadDialogUseCase, SaveProgressUseCase]
    C --> H[model: GameState, Message, Option]
    D --> I[repository: DialogRepository, GameRepository]
    D --> J[local: Room, SQLCipher]
    D --> K[remote: Ktor Client]
    D --> L[python: Chaquopy]
    style A fill:#1E3A8A,stroke:#000000
    style B fill:#1E3A8A,stroke:#000000
    style C fill:#7C3AED,stroke:#000000
    style D fill:#9333EA,stroke:#000000
    style E fill:#1E3A8A,stroke:#000000
    style F fill:#1E3A8A,stroke:#000000
    style G fill:#7C3AED,stroke:#000000
    style H fill:#7C3AED,stroke:#000000
    style I fill:#9333EA,stroke:#000000
    style J fill:#9333EA,stroke:#000000
    style K fill:#9333EA,stroke:#000000
    style L fill:#9333EA,stroke:#000000
```

## 3. Новые диаграммы

### 3.1 Sequence Diagram - Игровой процесс
- **Назначение**: Показывает последовательность взаимодействий между компонентами во время игрового процесса.
- **Аспект**: Динамика, взаимодействие.
- **Код Mermaid.js**:
```mermaid
sequenceDiagram
    participant U as User
    participant UI as ChatScreen
    participant VM as ChatViewModel
    participant UC as LoadDialogUseCase
    participant Repo as DialogRepository
    participant Room as Local Database
    participant Server as Ktor Server
    
    U->>UI: Открывает приложение
    UI->>VM: Инициализация
    VM->>UC: loadDialog("start")
    UC->>Repo: getDialog("start")
    Repo->>Room: Запрос локальных данных
    Room-->>Repo: Данные диалога
    Repo-->>UC: Dialog объект
    UC-->>VM: Обновление состояния
    VM-->>UI: Отображение сообщений
    UI-->>U: Показ интерфейса
    
    U->>UI: Выбирает опцию
    UI->>VM: selectOption("option_1")
    VM->>UC: updateFlags(changes)
    UC->>Repo: saveProgress(state)
    Repo->>Room: Сохранение прогресса
    Repo->>Server: Синхронизация (если онлайн)
    Server-->>Repo: Подтверждение
    Repo-->>UC: Успешное сохранение
    UC-->>VM: Обновление состояния
    VM-->>UI: Переход к следующему диалогу
```

### 3.2 State Diagram - Состояния игры
- **Назначение**: Показывает возможные состояния игры и переходы между ними.
- **Аспект**: Логика, состояния.
- **Код Mermaid.js**:
```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> MainMenu: Данные загружены
    Loading --> Error: Ошибка загрузки
    Error --> Loading: Повторная попытка
    
    MainMenu --> Gameplay: Начать игру
    MainMenu --> Settings: Настройки
    MainMenu --> Analytics: Статистика
    
    Gameplay --> Dialog: Загрузка диалога
    Dialog --> Choice: Показ опций
    Choice --> Dialog: Выбор сделан
    Dialog --> MiniGame: Триггер мини-игры
    MiniGame --> Dialog: Мини-игра завершена
    Dialog --> Ending: Достигнут конец
    
    Ending --> MainMenu: Вернуться в меню
    Ending --> NewGame: Начать заново
    
    Settings --> MainMenu: Настройки сохранены
    Analytics --> MainMenu: Статистика просмотрена
    
    NewGame --> Gameplay: Новая игра начата
```

### 3.3 ER Diagram - Структура данных
- **Назначение**: Показывает связи между сущностями в базе данных.
- **Аспект**: Данные, структура БД.
- **Код Mermaid.js**:
```mermaid
erDiagram
    USER {
        string anonymous_id PK
        string device_id
        timestamp created_at
        timestamp last_sync
        json preferences
    }
    
    GAME_STATE {
        string user_id FK
        int current_day
        int current_phase
        json story_flags
        json character_relations
        timestamp last_save
    }
    
    DIALOG {
        string dialog_id PK
        string title
        text content
        json options
        string next_dialog_id
        boolean is_mini_game
    }
    
    MINI_GAME {
        string game_id PK
        string game_type
        string difficulty
        json game_data
        string solution
        int time_limit
    }
    
    USER_PROGRESS {
        string user_id FK
        string dialog_id FK
        string game_id FK
        timestamp started_at
        timestamp completed_at
        int attempts
        json solution_data
    }
    
    SYNC_QUEUE {
        string sync_id PK
        string user_id FK
        string operation_type
        json data
        timestamp created_at
        boolean synced
    }
    
    USER ||--o{ GAME_STATE : has
    USER ||--o{ USER_PROGRESS : tracks
    DIALOG ||--o{ USER_PROGRESS : played_by
    MINI_GAME ||--o{ USER_PROGRESS : contains
    USER ||--o{ SYNC_QUEUE : queues
```

### 3.4 Deployment Diagram - Развертывание
- **Назначение**: Показывает физическую архитектуру развертывания системы.
- **Аспект**: Инфраструктура, развертывание.
- **Код Mermaid.js**:
```mermaid
graph TB
    subgraph "Android Device"
        App[Message 404 App<br/>Kotlin + Compose]
        LocalDB[(Local SQLite<br/>Room + SQLCipher)]
        Cache[Cache Storage<br/>SharedPreferences]
        Encrypt[Encryption Module<br/>AES-256]
    end
    
    subgraph "Local Network"
        Router[WiFi Router<br/>192.168.137.1]
        Server[Ktor Server<br/>192.168.137.1:8080]
        MySQL[(MySQL Database<br/>XAMPP)]
        Redis[(Redis Cache<br/>Session Storage)]
    end
    
    subgraph "External Services"
        CDN[Content Delivery<br/>CloudFlare]
        Analytics[Analytics Service<br/>Anonymous]
        Updates[Update Service<br/>Optional]
    end
    
    App --> LocalDB
    App --> Cache
    App --> Encrypt
    App --> Router
    Router --> Server
    Server --> MySQL
    Server --> Redis
    Server --> CDN
    Server --> Analytics
    Server --> Updates
    
    style App fill:#4ade80
    style LocalDB fill:#60a5fa
    style Server fill:#a78bfa
    style MySQL fill:#fbbf24
    style CDN fill:#f87171
```

### 3.5 Activity Diagram - Мини-игра
- **Назначение**: Показывает процесс выполнения мини-игры с Python валидацией.
- **Аспект**: Логика, алгоритмы.
- **Код Mermaid.js**:
```mermaid
flowchart TD
    Start([Начало мини-игры]) --> Load[Загрузка данных игры]
    Load --> Display[Отображение интерфейса]
    Display --> Input[Ввод пользователя]
    Input --> Validate{Валидация через Chaquopy}
    Validate -->|Неверно| Error[Показать ошибку]
    Error --> Input
    Validate -->|Верно| Success[Показать успех]
    Success --> Save[Сохранить прогресс]
    Save --> Update[Обновить флаги]
    Update --> Next[Перейти к следующему диалогу]
    Next --> End([Конец])
    
    style Start fill:#4ade80
    style Success fill:#60a5fa
    style Error fill:#f87171
    style End fill:#4ade80
```

### 3.6 Network Diagram - Сетевая архитектура
- **Назначение**: Показывает сетевые соединения и протоколы безопасности.
- **Аспект**: Сеть, безопасность.
- **Код Mermaid.js**:
```mermaid
graph TB
    subgraph "Client Side"
        Android[Android App<br/>Kotlin]
        Network[Network Module<br/>OkHttp + TLS]
        Crypto[Crypto Module<br/>AES-256]
    end
    
    subgraph "Network Layer"
        WiFi[WiFi Connection<br/>WPA2/WPA3]
        Router[Local Router<br/>192.168.137.1]
        Firewall[Firewall<br/>Port 8080]
    end
    
    subgraph "Server Side"
        Ktor[Ktor Server<br/>Kotlin + Coroutines]
        Auth[JWT Authentication<br/>Anonymous Tokens]
        RateLimit[Rate Limiting<br/>100 req/min]
        Logging[Request Logging<br/>Structured Logs]
    end
    
    subgraph "Database Layer"
        MySQL[(MySQL Database<br/>XAMPP)]
        Backup[Backup Service<br/>Daily Snapshots]
        Monitor[Monitoring<br/>Prometheus]
    end
    
    Android --> Network
    Network --> Crypto
    Network --> WiFi
    WiFi --> Router
    Router --> Firewall
    Firewall --> Ktor
    Ktor --> Auth
    Ktor --> RateLimit
    Ktor --> Logging
    Ktor --> MySQL
    MySQL --> Backup
    MySQL --> Monitor
    
    style Android fill:#4ade80
    style Network fill:#60a5fa
    style Ktor fill:#a78bfa
    style MySQL fill:#fbbf24
    style Firewall fill:#f87171
```

### 3.7 Security Diagram - Безопасность
- **Назначение**: Показывает многоуровневую систему безопасности.
- **Аспект**: Безопасность, защита данных.
- **Код Mermaid.js**:
```mermaid
graph TB
    subgraph "Data Protection"
        Encryption[AES-256 Encryption<br/>Local Storage]
        TLS[TLS 1.2+<br/>Network Transport]
        Hashing[Password Hashing<br/>bcrypt]
        Tokenization[JWT Tokens<br/>Anonymous IDs]
    end
    
    subgraph "Access Control"
        Anonymous[Anonymous Authentication<br/>152-ФЗ Compliance]
        RateLimit[Rate Limiting<br/>DDoS Protection]
        Validation[Input Validation<br/>SQL Injection Prevention]
        Sanitization[Data Sanitization<br/>XSS Prevention]
    end
    
    subgraph "Compliance"
        GOST[ГОСТ Р 34.12-2015<br/>Crypto Standards]
        PersonalData[152-ФЗ<br/>Personal Data Law]
        GDPR[GDPR Compliance<br/>Data Protection]
        Audit[Security Audit<br/>Regular Reviews]
    end
    
    subgraph "Monitoring"
        Logs[Security Logs<br/>Structured Logging]
        Alerts[Security Alerts<br/>Real-time Monitoring]
        Backup[Encrypted Backups<br/>Daily Snapshots]
        Recovery[Disaster Recovery<br/>RTO < 4 hours]
    end
    
    Encryption --> TLS
    TLS --> Hashing
    Hashing --> Tokenization
    Anonymous --> RateLimit
    RateLimit --> Validation
    Validation --> Sanitization
    GOST --> PersonalData
    PersonalData --> GDPR
    GDPR --> Audit
    Logs --> Alerts
    Alerts --> Backup
    Backup --> Recovery
    
    style Encryption fill:#f87171
    style Anonymous fill:#fb7185
    style GOST fill:#fb923c
    style Logs fill:#f59e0b
```

## 4. Соответствие стандартам
- **ГОСТ 19.701-90**: Стандарты на схемы и диаграммы.
- **ФЗ-152**: Анонимные идентификаторы (userId=ANON_<UUID>).
- **ГОСТ Р 34.12-2015**: Шифрование AES-256 в Room.
- **ISO/IEC 27001**: Безопасность (TLS 1.2+, DexGuard).
- **ISO/IEC 25010**: Качество ПО (разделение ответственности, модульность).
- **OWASP Mobile Top 10**: Защита данных (SQLCipher, DexGuard).

## 5. Рекомендации
- Храните диаграммы в `/docs/diagrams/architecture` и `ALL_DIAGRAMS.md`.
- Используйте Mermaid Live Editor для редактирования.
- Обновляйте диаграммы при добавлении новых компонентов или пакетов.
- Для PDF-версий используйте Pandoc или LaTeX с текстовым описанием.

**Подписи**:  
Разработчик: Иванов И.И.  
Согласовал: Петров П.П.
