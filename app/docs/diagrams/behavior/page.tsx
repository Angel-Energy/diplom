"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { BarChart3 } from 'lucide-react'

export default function BehaviorDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="behavior"
      categoryIcon={<BarChart3 className="h-5 w-5" />}
      categoryColor="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
    />
  )
} 