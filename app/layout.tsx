"use client"

import './globals.css'
import Script from 'next/script'
import Head from 'next/head'
import { Suspense } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <title>Сообщение 404 - Документация</title>
        <meta name="description" content="Документация проекта мобильной игры-детектива 'Сообщение 404'" />
        <meta name="generator" content="Next.js" />
        <Script 
          src="https://cdn.jsdelivr.net/npm/mermaid@11.7.0/dist/mermaid.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              {children}
            </Suspense>
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}