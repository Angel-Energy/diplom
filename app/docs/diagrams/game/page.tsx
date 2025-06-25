"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { Gamepad2 } from 'lucide-react'

export default function GameDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="game"
      categoryIcon={<Gamepad2 className="h-5 w-5" />}
      categoryColor="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
    />
  )
}
