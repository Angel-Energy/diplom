"use client"

import { getAllDiagrams, diagramCategories } from '@/diagrams/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, BarChart3, Layers, Shield, TestTube, Clock, Database, Gamepad2, Palette, Server, Code2, MoreHorizontal } from 'lucide-react'
import DiagramPageLayout from '@/components/diagram-page-layout'

export default function DiagramsPage() {
  // Получаем все диаграммы и категории из реестра
  const allDiagrams = getAllDiagrams()
  const categories = diagramCategories.map(cat => ({
    id: cat.id,
    title: cat.title,
    short_description: cat.description,
    count: cat.diagrams.length,
    href: `/docs/diagrams/${cat.id}`,
    badgeColor: cat.color,
  }))

  const totalDiagrams = allDiagrams.length
  const architecturalDiagrams = allDiagrams.filter(d => d.category === "architecture").length
  const behaviorDiagrams = allDiagrams.filter(d => d.category === "behavior").length
  const securityDiagrams = allDiagrams.filter(d => d.category === "security").length

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Диаграммы проекта
        </h1>
        <p className="text-xl text-slate-300">
          Все {totalDiagrams} диаграмм{totalDiagrams % 10 === 1 && totalDiagrams % 100 !== 11 ? 'а' : totalDiagrams % 10 >= 2 && totalDiagrams % 10 <= 4 && (totalDiagrams % 100 < 10 || totalDiagrams % 100 >= 20) ? 'ы' : ''} проекта «Сообщение 404» в {categories.length} категори{categories.length % 10 === 1 && categories.length % 100 !== 11 ? 'и' : categories.length % 10 >= 2 && categories.length % 10 <= 4 && (categories.length % 100 < 10 || categories.length % 100 >= 20) ? 'ях' : 'ях'} с подробными описаниями
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className={category.badgeColor}
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
                {categories.length}
              </div>
              <div className="text-sm text-slate-400">Категорий</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400 mb-2">
                {architecturalDiagrams}
              </div>
              <div className="text-sm text-slate-400">Архитектурные</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {behaviorDiagrams + securityDiagrams}
              </div>
              <div className="text-sm text-slate-400">Поведение + Безопасность</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-3">
          О диаграммах проекта «Сообщение 404»
        </h3>
        <div className="text-slate-300 text-sm space-y-2">
          <div>
            • <strong>Все диаграммы</strong> созданы специально для мобильной игры-детектива с архитектурой MVVM.
          </div>
          <div>
            • Полный охват: от архитектуры Jetpack Compose до аспектов безопасности и тестирования.
          </div>
          <div>
            • Технологический стек: Kotlin, MVVM, Clean Architecture, Ktor, Room, MySQL, DexGuard.
          </div>
          <div>
            • Соответствие стандартам: GDPR, 152-ФЗ, ГОСТ Р 34.12-2015, OWASP Mobile Top 10.
          </div>
          <div>
            • Каждая диаграмма содержит практические рекомендации для разработчиков, тестировщиков и архитекторов.
          </div>
          <div>
            • Модульная файловая система обеспечивает переиспользование и версионирование диаграмм.
          </div>
        </div>
      </div>

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
                    <Badge className={category.badgeColor}>
                      {category.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-slate-400 text-sm mb-4">
                    {category.short_description}
                  </p>
                  <div className="space-y-2 mt-auto">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
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
