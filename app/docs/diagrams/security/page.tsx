"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { Shield } from 'lucide-react'

export default function SecurityDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="security"
      categoryIcon={<Shield className="h-5 w-5" />}
      categoryColor="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
    />
  )
} 