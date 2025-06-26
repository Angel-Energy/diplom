import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { diagrams } from '@/diagrams/registry'

async function getDiagramFiles(): Promise<string[]> {
  const diagramsPath = path.join(process.cwd(), 'diagrams')
  const categories = await fs.readdir(diagramsPath)
  const files: string[] = []

  for (const category of categories) {
    const categoryPath = path.join(diagramsPath, category)
    const stats = await fs.stat(categoryPath)
    if (stats.isDirectory()) {
      try {
        const categoryFiles = await fs.readdir(categoryPath)
        for (const file of categoryFiles) {
          if (file.endsWith('.mmd')) {
            files.push(`${category}/${file}`)
          }
        }
      } catch (e) {
        console.error(`Could not read directory ${categoryPath}:`, e)
      }
    }
  }
  return files
}

export async function GET() {
  try {
    const registryFiles = new Set(diagrams.map(d => d.file.replace(/\\/g, '/')))
    const diskFiles = await getDiagramFiles()
    const diskFilesSet = new Set(diskFiles.map(f => f.replace(/\\/g, '/')))

    const missing_in_fs = [...registryFiles].filter(file => !diskFilesSet.has(file))
    const missing_in_registry = [...diskFilesSet].filter(file => !registryFiles.has(file))

    return NextResponse.json({
      missing_in_fs,
      missing_in_registry,
      total_in_registry: registryFiles.size,
      total_in_fs: diskFilesSet.size,
    })
  } catch (error) {
    console.error('QA verification error:', error)
    return NextResponse.json(
      { error: 'Не удалось выполнить проверку. Подробности в логах сервера.' },
      { status: 500 }
    )
  }
} 