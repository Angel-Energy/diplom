import { getDiagramById } from '@/diagrams/registry'
import type { Metadata } from 'next'
import DiagramClient from './DiagramClient'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { id } = await params
  const diagram = getDiagramById(id)
  if (!diagram) {
    return {
      title: 'Диаграмма не найдена',
      description: 'Диаграмма не найдена',
    }
  }
  return {
    title: diagram.title + ' | Диаграммы',
    description: diagram.description,
  }
}

export default async function DiagramPage({ params }: { params: any }) {
  const { category, id } = await params
  return <DiagramClient categoryId={category} diagramId={id} />
} 