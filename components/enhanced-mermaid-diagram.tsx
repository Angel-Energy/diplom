'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import mermaid from 'mermaid'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Download,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { DiagramModal } from '@/components/diagram-modal'

interface EnhancedMermaidDiagramProps {
  id: string
  title: string
  description: string
  mermaidCode: string
  conclusion: string
  tags: string[]
  relatedDiagrams?: Array<{
    id: string
    title: string
    href: string
  }>
}

export default function EnhancedMermaidDiagram({
  id,
  title,
  description,
  mermaidCode,
  conclusion,
  tags,
  relatedDiagrams = []
}: EnhancedMermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isRendered, setIsRendered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [svgContent, setSvgContent] = useState<string>("")

  // Инициализация Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        background: '#0f172a',
        primaryColor: '#1e293b',
        primaryTextColor: '#f1f5f9',
        nodeBorder: '#38bdf8',
        lineColor: '#38bdf8',
        fontFamily: 'Inter, sans-serif',
      },
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true
      }
    })
  }, [])

  // Рендеринг диаграммы
  const renderDiagram = useCallback(async () => {
    if (!diagramRef.current) return

    try {
      const { svg } = await mermaid.render(`diagram-${id}`, mermaidCode)
      diagramRef.current.innerHTML = svg
      setSvgContent(svg)
      setIsRendered(true)
    } catch (error) {
      console.error('Ошибка рендеринга диаграммы:', error)
      if (diagramRef.current) {
        diagramRef.current.innerHTML = `
          <div class="flex items-center justify-center h-32 text-red-500">
            Ошибка отображения диаграммы
          </div>
        `
      }
    }
  }, [id, mermaidCode])

  useEffect(() => {
    renderDiagram()
  }, [renderDiagram])

  // Масштабирование
  const handleZoom = useCallback((delta: number) => {
    setScale(prev => {
      const newScale = prev + delta
      return Math.max(0.1, Math.min(5, newScale))
    })
  }, [])

  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return

      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault()
          handleZoom(0.1)
          break
        case '-':
          e.preventDefault()
          handleZoom(-0.1)
          break
        case '0':
          e.preventDefault()
          resetZoom()
          break
        case 'Escape':
          setIsFullscreen(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, handleZoom, resetZoom])

  // Панорамирование
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return // Только левая кнопка мыши
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Колесо мыши для масштабирования
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    handleZoom(delta)
  }, [handleZoom])

  // Полноэкранный режим
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
    if (!isFullscreen) {
      resetZoom()
    }
  }, [isFullscreen, resetZoom])

  // Скачивание диаграммы
  const downloadDiagram = useCallback(() => {
    if (!diagramRef.current) return
    
    const svg = diagramRef.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = `${id}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)
  }, [id])

  return (
    <div className="w-full">
      {/* Заголовок и описание */}
      <div className="p-8 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{description}</p>
        
        {/* Теги */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Контейнер диаграммы */}
      <div className="p-8">
        <div
          ref={containerRef}
          className={`relative border-2 border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-900 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900' 
              : 'w-full h-[600px]'
          }`}
          onClick={() => svgContent && setModalOpen(true)}
          style={{ cursor: 'zoom-in' }}
        >
          {/* Панель управления */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleZoom(0.1)}
              title="Увеличить (Ctrl + +)"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleZoom(-0.1)}
              title="Уменьшить (Ctrl + -)"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={resetZoom}
              title="Сбросить масштаб (0)"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Выйти из полноэкранного режима (Esc)" : "Полноэкранный режим"}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={downloadDiagram}
              title="Скачать SVG"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Индикатор масштаба */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-600">
              {Math.round(scale * 100)}%
            </div>
          </div>

          {/* Диаграмма */}
          <div
            ref={diagramRef}
            className="w-full h-full flex items-center justify-center p-8"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: 'center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          />
        </div>
      </div>

      {/* Заключение */}
      <div className="p-8 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Практическое заключение</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{conclusion}</p>
      </div>

      {/* Связанные диаграммы */}
      {relatedDiagrams.length > 0 && (
        <div className="p-8 border-t border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Связанные диаграммы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedDiagrams.map((related) => (
              <Link
                key={related.id}
                href={related.href}
                className="block p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {related.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Перейти к связанной диаграмме
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {svgContent && (
        <DiagramModal
          svgContent={svgContent}
          title={title}
          open={modalOpen}
          onOpenChange={setModalOpen}
        >
          <div />
        </DiagramModal>
      )}
    </div>
  )
} 