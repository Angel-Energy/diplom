import { getAllDiagrams } from '@/diagrams/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, BarChart3, BookOpen, FileText, Settings, Users, Zap } from 'lucide-react'

export default function DocsPage() {
  const totalDiagrams = getAllDiagrams().length

  const sections = [
    {
      title: "Диаграммы проекта",
      description: "Модульная система диаграмм с масштабированием и панорамированием",
      href: "/docs/diagrams",
      icon: <BarChart3 className="h-6 w-6" />,
      badge: `${totalDiagrams} диаграмм`,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      title: "Архитектура",
      description: "C4 модель, компоненты, развертывание, Clean Architecture",
      href: "/docs/architecture",
      icon: <Settings className="h-6 w-6" />,
      badge: "MVVM + Clean",
      color: "bg-red-500/10 text-red-400 border-red-500/20"
    },
    {
      title: "API документация",
      description: "Ktor эндпоинты, форматы запросов, аутентификация",
      href: "/docs/api",
      icon: <Zap className="h-6 w-6" />,
      badge: "REST + JSON",
      color: "bg-green-500/10 text-green-400 border-green-500/20"
    },
    {
      title: "Игровые механики",
      description: "Game Loop, диалоги, мини-игры, прогрессия, концовки",
      href: "/docs/game-mechanics",
      icon: <Users className="h-6 w-6" />,
      badge: "60 мини-игр",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      title: "UI/UX",
      description: "User Flow, мессенджер-интерфейс, адаптивность, доступность",
      href: "/docs/ui-ux",
      icon: <BookOpen className="h-6 w-6" />,
      badge: "Jetpack Compose",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      title: "Инфраструктура",
      description: "Локальная сеть, безопасность, мониторинг, резервное копирование",
      href: "/docs/infrastructure",
      icon: <FileText className="h-6 w-6" />,
      badge: "Ktor + MySQL",
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Заголовок */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Документация проекта</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Полная документация мобильной игры «Сообщение 404»
        </p>
        
        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalDiagrams}</div>
            <div className="text-sm text-muted-foreground">Диаграмм</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">MVVM</div>
            <div className="text-sm text-muted-foreground">Архитектура</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">AES-256</div>
            <div className="text-sm text-muted-foreground">Шифрование</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">Ktor</div>
            <div className="text-sm text-muted-foreground">Сервер</div>
          </div>
        </div>
      </div>

      {/* Основные разделы */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Link key={index} href={section.href} className="block group">
            <Card className="h-full group-hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-muted">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <Badge className={`text-xs ${section.color}`}>
                      {section.badge}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {section.description}
                </p>
                <div className="flex items-center text-primary group-hover:underline">
                  Открыть раздел
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Информация о проекте */}
      <div className="mt-12 pt-8 border-t">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>О проекте «Сообщение 404»</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Технический стек</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Kotlin + Jetpack Compose (Android)</li>
                  <li>• MVVM + Clean Architecture</li>
                  <li>• Room Database + DataStore</li>
                  <li>• Ktor Server + MySQL</li>
                  <li>• Chaquopy (Python в Android)</li>
                  <li>• AES-256 + TLS 1.2+</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Особенности</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 10 игровых дней с ветвлением</li>
                  <li>• 60 мини-игр на Python/JavaScript</li>
                  <li>• 5 различных концовок</li>
                  <li>• Офлайн-режим с синхронизацией</li>
                  <li>• Соответствие 152-ФЗ и GDPR</li>
                  <li>• Локальная инфраструктура</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Быстрый старт */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Быстрый старт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Начните изучение документации с диаграмм проекта, которые показывают архитектуру, 
                поведение системы, безопасность и жизненный цикл разработки.
              </p>
              <div className="flex gap-2">
                <Link href="/docs/diagrams">
                  <Badge className="cursor-pointer hover:bg-primary/80">
                    Просмотреть диаграммы
                  </Badge>
                </Link>
                <Link href="/docs/architecture">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Изучить архитектуру
                  </Badge>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
