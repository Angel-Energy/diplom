"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { MoreHorizontal } from 'lucide-react'

export default function OtherDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="other"
      categoryIcon={<MoreHorizontal className="h-5 w-5" />}
      categoryColor="bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
    />
  )
} 