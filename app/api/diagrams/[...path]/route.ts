import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = await params
    const filePath = path.join('/')
    
    // Проверяем, что путь безопасный (не содержит ..)
    if (filePath.includes('..')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }
    
    // Путь к файлу диаграммы
    const fullPath = join(process.cwd(), 'diagrams', filePath)
    
    // Проверяем расширение файла
    if (!filePath.endsWith('.mmd')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }
    
    // Читаем файл
    const content = await readFile(fullPath, 'utf-8')
    
    // Возвращаем содержимое с правильными заголовками
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600' // Кэшируем на 1 час
      }
    })
  } catch (error) {
    console.error('Error reading diagram file:', error)
    return NextResponse.json(
      { error: 'Diagram file not found' },
      { status: 404 }
    )
  }
} 