import './globals.css'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ThemeWrapper from '@/components/ThemeWrapper'
import Script from 'next/script'

export const metadata = {
  title: 'Сообщение 404 - Документация',
  description: "Документация проекта мобильной игры-детектива 'Сообщение 404'",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ErrorBoundary>
          <ThemeWrapper>
            <Suspense fallback={<div>Загрузка...</div>}>
              {children}
            </Suspense>
            <Toaster />
          </ThemeWrapper>
        </ErrorBoundary>
      </body>
    </html>
  )
}