"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import MermaidDiagram from '@/components/mermaid-diagram'

export default function LifecycleDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="lifecycle"
      categoryIcon={<Clock className="h-5 w-5" />}
      categoryColor="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    >
      <Card>
        <CardHeader>
          <CardTitle>Жизненный цикл сессии пользователя</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Диаграмма отражает этапы пользовательской сессии: вход (аутентификация через PIN с шифрованием, 152-ФЗ), активность (чат, мини-игры, автосохранение в Room, офлайн-режим, UI на Jetpack Compose с тёмной темой), выход (автосохранение и синхронизация с Ktor-сервером). Реализация: GameEngine, WorkManager. Роли: Android, UI/UX, геймдизайнер, безопасность, QA, техписатель. Аспекты: офлайн, тестирование прерываний, документация сценариев и кода.</p>
          <ul className="mb-2 list-disc list-inside text-sm">
            <li><b>Вход:</b> Аутентификация пользователя через PIN на LockScreen с шифрованием (152-ФЗ).</li>
            <li><b>Активность:</b> Прохождение чата и мини-игр, управление GameViewModel, автосохранение в Room (офлайн).</li>
            <li><b>Выход:</b> Завершение сессии, автосохранение, синхронизация с сервером при наличии подключения.</li>
            <li><b>UI:</b> Jetpack Compose, оптимизация под тёмную тему.</li>
            <li><b>Автосохранение:</b> WorkManager, офлайн-режим, последующая синхронизация.</li>
            <li><b>Роли:</b> Android, UI/UX, геймдизайнер, безопасность, QA, техписатель.</li>
            <li><b>Аспекты:</b> тестирование прерываний, офлайн-автосохранение, документация сценариев и кода.</li>
          </ul>
          <div className="my-4">
            <MermaidDiagram filePath="lifecycle/session-lifecycle.mmd" />
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-muted-foreground">Показать PlantUML-код</summary>
            <pre className="bg-muted p-2 rounded text-xs overflow-x-auto mt-2">{`
@startuml Session Lifecycle
skinparam monochrome true

[*] --> Вход : Аутентификация
Вход --> Активность : Чат, мини-игры
Активность --> Выход : Завершение сессии
Выход --> [*] : Автосохранение
@enduml
`}</pre>
          </details>
        </CardContent>
      </Card>
    </CategoryPageTemplate>
  )
} 