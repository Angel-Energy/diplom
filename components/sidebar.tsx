"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { diagramCategories } from '@/diagrams/registry'
import {
  Home,
  Layers,
  LayoutDashboard,
  Code,
  Network,
  Shield,
  FlaskConical,
  Server,
} from 'lucide-react'

// Новый массив навигации с иконками и подписями
const navItems = [
  {
    title: 'Обзор проекта',
    description: 'Общая информация о проекте "Сообщение 404"',
    href: '/docs/overview',
    icon: 'Home',
  },
  {
    title: 'Архитектура',
    description: 'Диаграммы архитектуры системы и компонентов',
    href: '/docs/architecture',
    icon: 'Layers',
  },
  {
    title: 'Диаграммы',
    description: 'Все 62 диаграммы проекта по категориям',
    href: '/docs/diagrams',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Исходный код',
    description: 'Компоненты Android приложения на Kotlin',
    href: '/docs/source',
    icon: 'Code',
  },
  {
    title: 'API Документация',
    description: 'REST API и WebSocket эндпоинты',
    href: '/docs/api',
    icon: 'Network',
  },
  {
    title: 'Безопасность',
    description: 'Шифрование, аутентификация, 152-ФЗ',
    href: '/docs/security',
    icon: 'Shield',
  },
  {
    title: 'Тестирование',
    description: 'Стратегии тестирования и QA',
    href: '/docs/testing',
    icon: 'FlaskConical',
  },
  {
    title: 'Развертывание',
    description: 'CI/CD, инфраструктура, DevOps',
    href: '/docs/infrastructure',
    icon: 'Server',
  },
]

const iconMap = {
  Home,
  Layers,
  LayoutDashboard,
  Code,
  Network,
  Shield,
  FlaskConical,
  Server,
}

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-72 min-h-screen bg-[#181f2a] text-white flex flex-col py-6 px-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-[#232b3b] rounded-lg p-2">
          <LayoutDashboard size={28} color="#7fd7ff" />
        </div>
        <div>
          <div className="font-bold text-lg">Сообщение 404</div>
          <div className="text-xs text-[#7fa7c7]">Техническая документация</div>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map(item => {
          const Icon = iconMap[item.icon]
          const active = pathname === item.href
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'flex flex-col gap-0.5 rounded-lg px-3 py-2 transition-colors',
                active ? 'bg-[#232b3b] text-cyan-300' : 'hover:bg-[#232b3b] text-white'
              )}
            >
              <div className="flex items-center gap-2">
                <Icon size={20} className={active ? 'text-cyan-300' : 'text-[#7fa7c7]'} />
                <span className="font-medium text-base">{item.title}</span>
              </div>
              <span className="text-xs text-[#7fa7c7] pl-7">{item.description}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
