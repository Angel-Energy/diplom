import MermaidDiagram from '@/components/mermaid-diagram'

export default function OtherPage() {
  return (
    <div className="space-y-12">
      {/* 58. Roadmap проекта */}
      <MermaidDiagram
        title="Roadmap проекта"
        description="Этапы: июнь 2025 — планирование и начальная разработка; июль–август 2025 — активная разработка и тестирование (релиз 5 августа); сентябрь–октябрь 2025 — обновления и исправления багов; ноябрь–декабрь 2025 — новый контент и подготовка к версии 2.0. Управляется через Jira, синхронизировано с CI/CD, тёмная тема."
        mermaidCode={`gantt\n    title Roadmap \"Сообщение 404\"\n    dateFormat  YYYY-MM-DD\n    section Планирование\n    Планирование    : 2025-06-01, 2025-06-30\n    section Разработка\n    Активная разработка : 2025-07-01, 2025-08-05\n    section Обновления\n    Исправления багов : 2025-09-01, 2025-10-31\n    section Новый контент\n    Версия 2.0 : 2025-11-01, 2025-12-31`}
        category="other"
        conclusion="Требует регулярного обновления графика, этапы согласованы с релизом, документация включает подробный план."
      />

      {/* 59. Структура команды */}
      <MermaidDiagram
        title="Структура команды"
        description="Роли: разработчики (Android, backend), дизайнеры (UI/UX, 2D, motion), тестировщики (QA, гейм, доступность). Agile-команды, роли через Jira, тёмная тема."
        mermaidCode={`%% PlantUML\n@startuml Team Structure\nskinparam monochrome true\n\npackage \"Разработчики\" {\n  [Android Dev (Kotlin)]\n  [Backend Dev (Ktor)]\n}\n\npackage \"Дизайнеры\" {\n  [UI/UX Designer]\n  [2D Artist]\n  [Motion Designer]\n}\n\npackage \"Тестировщики\" {\n  [QA Analyst]\n  [Game Tester]\n  [Accessibility Tester]\n}\n\n[Manager] --> [Разработчики]\n[Manager] --> [Дизайнеры]\n[Manager] --> [Тестировщики]\n@enduml`}
        category="other"
        conclusion="Требует регулярной синхронизации, роли адаптируются под задачи, документация включает оргструктуру."
      />

      {/* 60. Схема Git-репозитория */}
      <MermaidDiagram
        title="Схема Git-репозитория"
        description="Ветки: main (стабильная), develop (интеграция), feature (конкретные функции). GitHub, GitFlow, CI/CD, тёмная тема."
        mermaidCode={`graph TD\n    A[Main\\nСтабильная] --> B[Develop\\nИнтеграция]\n    B --> C[Feature/chat-encryption]\n    B --> D[Feature/mini-game]`}
        category="other"
        conclusion="Требует строгого соблюдения GitFlow, автоматические тесты при коммитах, документация включает правила ветвления."
      />

      {/* 61. Диаграмма compliance */}
      <MermaidDiagram
        title="Диаграмма compliance"
        description="Стандарты: 152-ФЗ (шифрование AES-256, аутентификация), ГОСТ Р 34.12-2015 (Кузнечик). Соответствие проверяется на этапах разработки и деплоя, SQLCipher и TLS, тёмная тема."
        mermaidCode={`%% PlantUML\n@startuml Compliance Diagram\nskinparam monochrome true\n\npackage \"152-ФЗ\" {\n  [Шифрование AES-256]\n  [Аутентификация]\n}\n\npackage \"ГОСТ Р 34.12-2015\" {\n  [Алгоритм Кузнечик]\n}\n\n[Android App] --> [152-ФЗ]\n[Ktor Server] --> [152-ФЗ]\n[Ktor Server] --> [ГОСТ Р 34.12-2015]\n@enduml`}
        category="other"
        conclusion="Требует регулярного аудита, стандарты интегрированы в код, документация включает чек-лист."
      />
    </div>
  )
} 