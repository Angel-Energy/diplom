"use client"

import { getAllDiagrams, diagramCategories, getCategoryDescriptions } from '@/diagrams/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, BarChart3, Layers, Shield, TestTube, Clock, Database, Gamepad2, Palette, Server, Code2, MoreHorizontal } from 'lucide-react'
import DiagramPageLayout from '@/components/diagram-page-layout'

const CATEGORY_META = [
  {
    id: 'architecture',
    title: 'Архитектура',
    description: 'C4 модель, компоненты, слои, развертывание',
    color: 'bg-cyan-700 text-cyan-200',
    bar: 'from-cyan-400 to-purple-400',
  },
  {
    id: 'game',
    title: 'Игровые механики',
    description: 'Game Loop, диалоги, мини-игры, прогрессия',
    color: 'bg-purple-700 text-purple-200',
    bar: 'from-purple-400 to-cyan-400',
  },
  {
    id: 'data',
    title: 'Данные',
    description: 'ERD, потоки данных, репликация, миграция',
    color: 'bg-blue-700 text-blue-200',
    bar: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'api',
    title: 'API',
    description: 'Endpoints, форматы, состояния API',
    color: 'bg-violet-700 text-violet-200',
    bar: 'from-violet-400 to-cyan-400',
  },
  {
    id: 'ui',
    title: 'UI/UX',
    description: 'User Flow, навигация, состояния UI',
    color: 'bg-cyan-800 text-cyan-200',
    bar: 'from-cyan-400 to-purple-400',
  },
  {
    id: 'infrastructure',
    title: 'Инфраструктура',
    description: 'Сеть, безопасность, мониторинг, бэкапы',
    color: 'bg-teal-800 text-teal-200',
    bar: 'from-teal-400 to-cyan-400',
  },
  {
    id: 'dynamic',
    title: 'Динамические',
    description: 'Sequence, State, Activity, Timing',
    color: 'bg-lime-800 text-lime-200',
    bar: 'from-lime-400 to-cyan-400',
  },
]

const categoryColors: Record<string, string> = {
  architecture: 'bg-cyan-700 text-cyan-200',
  data: 'bg-blue-700 text-blue-200',
  game: 'bg-purple-700 text-purple-200',
  api: 'bg-violet-700 text-violet-200',
  ui: 'bg-cyan-800 text-cyan-200',
  infrastructure: 'bg-teal-800 text-teal-200',
  dynamic: 'bg-lime-800 text-lime-200',
  behavior: 'bg-cyan-900 text-cyan-200',
  security: 'bg-red-800 text-red-200',
  testing: 'bg-green-800 text-green-200',
  lifecycle: 'bg-orange-800 text-orange-200',
  other: 'bg-gray-700 text-gray-200',
}
const categoryBars: Record<string, string> = {
  architecture: 'from-cyan-400 to-purple-400',
  data: 'from-blue-400 to-cyan-400',
  game: 'from-purple-400 to-cyan-400',
  api: 'from-violet-400 to-cyan-400',
  ui: 'from-cyan-400 to-purple-400',
  infrastructure: 'from-teal-400 to-cyan-400',
  dynamic: 'from-lime-400 to-cyan-400',
  behavior: 'from-cyan-400 to-blue-400',
  security: 'from-red-400 to-cyan-400',
  testing: 'from-green-400 to-cyan-400',
  lifecycle: 'from-orange-400 to-cyan-400',
  other: 'from-gray-400 to-cyan-400',
}

export default function DiagramsPage() {
  const allDiagrams = getAllDiagrams()
  const totalDiagrams = allDiagrams.length
  const categoryDescriptions = getCategoryDescriptions()
  const categories = diagramCategories.map(cat => ({
    id: cat.id,
    title: cat.title,
    count: cat.diagrams.length,
    href: `/docs/diagrams/${cat.id}`,
    description: categoryDescriptions[cat.id]?.split('\n')[0] || '',
    color: categoryColors[cat.id] || 'bg-cyan-700 text-cyan-200',
    bar: categoryBars[cat.id] || 'from-cyan-400 to-purple-400',
  }))

  // Статистика
  const numCategories = categories.length
  const numArchitectural = categories.find(c => c.id === 'architecture')?.count || 0
  const numFunctional = totalDiagrams - numArchitectural

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Диаграммы проекта
        </h1>
        <p className="text-xl text-slate-300">
          Все {totalDiagrams} диаграмм проекта "Сообщение 404" в текстовом формате с описаниями и выводами
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className={category.color + ' border-0'}
            >
              {category.title}: {category.count}
            </Badge>
          ))}
        </div>
      </div>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Общая статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {totalDiagrams}
              </div>
              <div className="text-sm text-slate-400">Всего диаграмм</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {numCategories}
              </div>
              <div className="text-sm text-slate-400">Категорий</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {numArchitectural}
              </div>
              <div className="text-sm text-slate-400">Архитектурных</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {numFunctional}
              </div>
              <div className="text-sm text-slate-400">Функциональных</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const percentage = totalDiagrams > 0 ? Math.round((category.count / totalDiagrams) * 100) : 0
          return (
            <Link key={index} href={category.href} className="block group">
              <Card className="bg-slate-800/50 border-slate-700/50 h-full group-hover:border-cyan-400 transition-colors flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white group-hover:text-cyan-400">
                      {category.title}
                    </CardTitle>
                    <Badge className={category.color + ' border-0'}>
                      {category.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-slate-400 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="space-y-2 mt-auto">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${category.bar} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400 text-center">
                      {percentage}% от общего количества
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
