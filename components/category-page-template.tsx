'use client'

import { getCategoryById, categoryDescriptions } from '@/diagrams/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import DiagramPageLayout from '@/components/diagram-page-layout'
import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'

interface CategoryPageTemplateProps {
  categoryId: string
  categoryIcon: ReactNode
  categoryColor: string
  relatedCategories?: string[]
}

export default function CategoryPageTemplate({
  categoryId,
  categoryIcon,
  categoryColor,
  relatedCategories = ['behavior', 'security', 'testing', 'lifecycle']
}: CategoryPageTemplateProps) {
  const category = getCategoryById(categoryId)

  if (!category) {
    return <div>Категория не найдена</div>
  }

  return (
    <DiagramPageLayout
      categoryId={category.id}
      categoryTitle={category.title}
      categoryIcon={categoryIcon}
      categoryColor={categoryColor}
      showNavigation={true}
      showCategoryBadge={false}
    >
      <div className="p-8">
        {/* Заголовок */}
        <div className="mb-8 flex items-center gap-4">
          {category.icon && (
            <span className="text-3xl">{category.icon}</span>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-1 text-slate-900 dark:text-slate-100 tracking-tight">{category.title}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{category.description}</p>
          </div>
        </div>

        {/* Подробное описание категории */}
        {categoryDescriptions[category.id] && (
          <div className="mb-8 prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown>{categoryDescriptions[category.id]}</ReactMarkdown>
          </div>
        )}

        {/* Диаграммы */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(category.diagrams ?? []).map((diagram) => (
            <Card key={diagram.id} className="bg-slate-900/80 border border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-200 rounded-2xl group flex flex-col h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors font-semibold mb-2 flex items-center gap-2">
                  {diagram.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mb-2">
                  {diagram.tags && diagram.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-slate-800/80 border border-slate-700 text-cyan-300 font-mono px-2 py-0.5 rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow justify-between">
                <p className="text-slate-300 text-sm mb-4 leading-relaxed min-h-[48px]">
                  {diagram.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <Link
                    href={`/docs/diagrams/${category.id}/${diagram.id}`}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-white font-medium transition-colors px-3 py-1.5 rounded-lg bg-cyan-900/30 hover:bg-cyan-700/40 shadow-sm"
                  >
                    Открыть диаграмму
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {diagram.relatedDiagrams && diagram.relatedDiagrams.length > 0 && (
                    <div className="text-xs text-slate-400">
                      {diagram.relatedDiagrams.length} связанных
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Навигация */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Другие категории диаграмм</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCategories.map((catId) => {
              const cat = getCategoryById(catId)
              if (!cat) return null
              
              return (
                <Link
                  key={catId}
                  href={`/docs/diagrams/${catId}`}
                  className="block p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs mb-2 ${cat.color}`}>
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{cat.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </DiagramPageLayout>
  )
} 