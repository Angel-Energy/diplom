"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navigation = [
  {
    title: "Введение",
    href: "/docs/introduction",
  },
  {
    title: "Общие сведения",
    href: "/docs/overview",
  },
  {
    title: "Требования",
    href: "/docs/requirements",
  },
  {
    title: "Архитектура системы",
    href: "/docs/architecture",
  },
  {
    title: "API Reference",
    href: "/docs/api",
  },
  {
    title: "Игровые механики",
    href: "/docs/game-mechanics",
  },
  {
    title: "UI/UX",
    href: "/docs/ui-ux",
  },
  {
    title: "Инфраструктура",
    href: "/docs/infrastructure",
  },
  {
    title: "QA тестирование",
    href: "/docs/qa",
  },
  {
    title: "Развертывание",
    href: "/docs/setup",
  },
  {
    title: "QR коды",
    href: "/docs/download",
  },
  {
    title: "ROADMAP",
    href: "/docs/roadmap",
  },
  {
    title: "Диаграммы",
    href: "/docs/diagrams",
    children: [
      { title: "Архитектура", href: "/docs/diagrams/architecture" },
      { title: "Базы данных", href: "/docs/diagrams/data" },
      { title: "Игровые механики", href: "/docs/diagrams/game" },
      { title: "UI/UX", href: "/docs/diagrams/ui" },
      { title: "Инфраструктура", href: "/docs/diagrams/infrastructure" },
      { title: "Динамические", href: "/docs/diagrams/dynamic" },
      { title: "Поведение", href: "/docs/diagrams/behavior" },
      { title: "Безопасность", href: "/docs/diagrams/security" },
      { title: "Тестирование", href: "/docs/diagrams/testing" },
      { title: "Жизненный цикл", href: "/docs/diagrams/lifecycle" },
      { title: "API", href: "/docs/diagrams/api" },
      { title: "Прочие", href: "/docs/diagrams/other" },
    ],
  },
  {
    title: "Правовая информация",
    href: "/docs/legal",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-slate-900/95 border-r border-slate-700/50 overflow-y-auto backdrop-blur-sm">
      <div className="p-6 border-b border-slate-700/50">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <Image src="/images/icon.png" alt="Сообщение 404" width={32} height={32} className="rounded-lg" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-200">Сообщение 404</h2>
            <p className="text-sm text-slate-400">Документация</p>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <div key={item.title}>
            <div className="flex items-center">
              <Link
                href={item.href}
                className={cn(
                  "flex-1 px-3 py-2 text-sm rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50",
                )}
              >
                {item.title}
              </Link>
              {item.children && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(item.title)}
                  className="p-1 h-8 w-8 text-slate-400 hover:text-slate-200"
                >
                  {expandedItems.includes(item.title) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {item.children && expandedItems.includes(item.title) && (
              <div className="ml-4 mt-2 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block px-3 py-1 text-sm rounded transition-colors",
                      pathname === child.href
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30",
                    )}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
