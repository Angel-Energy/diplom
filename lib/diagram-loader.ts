import { DiagramMetadata, getRelatedDiagrams } from '@/diagrams/registry'

export async function loadDiagramFile(filePath: string): Promise<string> {
  try {
    // В Next.js мы можем использовать динамический импорт для загрузки файлов
    // Для .mmd файлов мы будем использовать fetch
    const response = await fetch(`/api/diagrams/${filePath}`)
    
    if (!response.ok) {
      throw new Error(`Failed to load diagram: ${response.statusText}`)
    }
    
    return await response.text()
  } catch (error) {
    console.error('Error loading diagram file:', error)
    throw new Error(`Не удалось загрузить диаграмму: ${filePath}`)
  }
}

export function getRelatedDiagramsWithHref(diagramId: string): Array<{
  id: string
  title: string
  href: string
}> {
  const related = getRelatedDiagrams(diagramId)
  
  return related.map(diagram => ({
    id: diagram.id,
    title: diagram.title,
    href: `/docs/diagrams/${diagram.category}/${diagram.id}`
  }))
}

export function getDiagramHref(diagram: DiagramMetadata): string {
  return `/docs/diagrams/${diagram.category}/${diagram.id}`
} 