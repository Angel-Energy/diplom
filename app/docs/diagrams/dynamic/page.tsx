"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { BarChart3 } from 'lucide-react'

export default function DynamicDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="dynamic"
      categoryIcon={<BarChart3 className="h-5 w-5" />}
      categoryColor="bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20"
    />
  )
}
