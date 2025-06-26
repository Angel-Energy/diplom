"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { Code2 } from 'lucide-react'

export default function ApiDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="api"
      categoryIcon={<Code2 className="h-5 w-5" />}
      categoryColor="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    />
  )
}
