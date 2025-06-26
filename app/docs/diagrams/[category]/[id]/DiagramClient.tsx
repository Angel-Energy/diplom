"use client"

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { getDiagramById, getCategoryById, getAllDiagrams } from '@/diagrams/registry'
import { loadDiagramFile, getRelatedDiagramsWithHref } from '@/lib/diagram-loader'
import EnhancedMermaidDiagram from '@/components/enhanced-mermaid-diagram'
import DiagramPageLayout from '@/components/diagram-page-layout'
import { Layers, Database, Gamepad2, Palette, Server, BarChart3, Shield, TestTube, Clock, Code2, MoreHorizontal } from 'lucide-react'
import MermaidDiagram from '@/components/mermaid-diagram'

const categoryIcons = {
  architecture: <Layers className="h-5 w-5" />,
  data: <Database className="h-5 w-5" />,
  game: <Gamepad2 className="h-5 w-5" />,
  ui: <Palette className="h-5 w-5" />,
  infrastructure: <Server className="h-5 w-5" />,
  dynamic: <BarChart3 className="h-5 w-5" />,
  behavior: <BarChart3 className="h-5 w-5" />,
  security: <Shield className="h-5 w-5" />,
  testing: <TestTube className="h-5 w-5" />,
  lifecycle: <Clock className="h-5 w-5" />,
  api: <Code2 className="h-5 w-5" />,
  other: <MoreHorizontal className="h-5 w-5" />
}

const categoryColors = {
  architecture: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  data: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  game: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  ui: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  infrastructure: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  dynamic: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20',
  behavior: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  security: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  testing: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  lifecycle: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  api: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  other: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
}

interface DiagramClientProps {
  categoryId: string
  diagramId: string
}

export default function DiagramClient({ categoryId, diagramId }: DiagramClientProps) {
  const [mermaidCode, setMermaidCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const diagram = getDiagramById(diagramId)
  const category = getCategoryById(categoryId)

  useEffect(() => {
    if (!diagram || !category) {
      notFound()
      return
    }

    const loadDiagram = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const code = await loadDiagramFile(diagram.file)
        setMermaidCode(code)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить диаграмму')
      } finally {
        setIsLoading(false)
      }
    }

    loadDiagram()
  }, [diagramId, categoryId])

  if (!diagram || !category) {
    notFound()
  }

  const relatedDiagrams = getRelatedDiagramsWithHref(diagram.id)
  const categoryIcon = categoryIcons[categoryId as keyof typeof categoryIcons]
  const categoryColor = categoryColors[categoryId as keyof typeof categoryColors]

  return (
    <DiagramPageLayout
      categoryId={category.id}
      categoryTitle={category.title}
      categoryIcon={categoryIcon}
      categoryColor={categoryColor}
    >
      {/* Загрузка */}
      {isLoading && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Загрузка диаграммы...</p>
          </div>
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400 font-medium mb-2 text-lg">Ошибка загрузки</p>
            <p className="text-slate-600 dark:text-slate-400">{error}</p>
          </div>
        </div>
      )}

      {/* Диаграмма */}
      {!isLoading && !error && mermaidCode && (
        <MermaidDiagram
          title={diagram.title}
          description={diagram.description}
          mermaidCode={mermaidCode}
          category={category.id}
          conclusion={diagram.conclusion ?? ""}
        />
      )}

      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-500">Категория:</span>
        <span className={"px-2 py-1 rounded text-xs font-medium border " + categoryColor}>{category.title}</span>
        {diagram.tags && diagram.tags.length > 0 && (
          <>
            <span className="text-xs text-slate-500 ml-4">Теги:</span>
            {diagram.tags.map(tag => (
              <span key={tag} className="bg-slate-200 dark:bg-slate-700 text-xs px-2 py-1 rounded ml-1">{tag}</span>
            ))}
          </>
        )}
      </div>
      {relatedDiagrams.length > 0 && (
        <div className="mt-4">
          <span className="text-xs text-slate-500">Связанные диаграммы:</span>
          <ul className="list-disc ml-6 mt-1">
            {relatedDiagrams.map(rd => (
              <li key={rd.id}>
                <a href={rd.href} className="text-cyan-600 hover:underline">{rd.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DiagramPageLayout>
  )
} 