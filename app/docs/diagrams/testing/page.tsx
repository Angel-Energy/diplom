"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { TestTube } from 'lucide-react'

export default function TestingDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="testing"
      categoryIcon={<TestTube className="h-5 w-5" />}
      categoryColor="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
    />
  )
} 