"use client"

import CategoryPageTemplate from '@/components/category-page-template'
import { Server } from 'lucide-react'

export default function InfrastructureDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="infrastructure"
      categoryIcon={<Server className="h-5 w-5" />}
      categoryColor="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
    />
  )
}
