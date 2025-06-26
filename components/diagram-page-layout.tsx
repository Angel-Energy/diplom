'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

interface DiagramPageLayoutProps {
  children: React.ReactNode
  categoryId?: string
  categoryTitle?: string
  categoryIcon?: React.ReactNode
  categoryColor?: string
  showNavigation?: boolean
  showCategoryBadge?: boolean
}

export default function DiagramPageLayout({
  children,
  categoryId,
  categoryTitle,
  categoryIcon,
  categoryColor,
  showNavigation = true,
  showCategoryBadge = true
}: DiagramPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Навигация */}
        {showNavigation && (
          <div className="mb-8 flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/docs/diagrams">
                <Home className="h-4 w-4 mr-2" />
                Все диаграммы
              </Link>
            </Button>
            {categoryId && categoryTitle && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/docs/diagrams/${categoryId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {categoryTitle}
                </Link>
              </Button>
            )}
          </div>
        )}

        {/* Бейдж категории */}
        {showCategoryBadge && categoryTitle && categoryIcon && categoryColor && (
          <div className="mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${categoryColor} border`}>
              <span className="text-base">{categoryIcon}</span>
              <span>{categoryTitle}</span>
            </div>
          </div>
        )}

        {/* Основной контент */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
} 