"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { Database } from 'lucide-react'

export default function DataDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="data"
      categoryIcon={<Database className="h-5 w-5" />}
      categoryColor="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    />
  )
} 