"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { Layers } from 'lucide-react'

export default function ArchitectureDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="architecture"
      categoryIcon={<Layers className="h-5 w-5" />}
      categoryColor="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
    />
  )
}
