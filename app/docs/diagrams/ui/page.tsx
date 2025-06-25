"use client";

import CategoryPageTemplate from '@/components/category-page-template'
import { Palette } from 'lucide-react'

export default function UIDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="ui"
      categoryIcon={<Palette className="h-5 w-5" />}
      categoryColor="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
    />
  )
}
