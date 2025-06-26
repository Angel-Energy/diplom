"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react'

interface VerificationResult {
  missing_in_fs: string[]
  missing_in_registry: string[]
  total_in_registry: number
  total_in_fs: number
}

export default function QAPage() {
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const runVerification = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/qa/verify')
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.statusText}`)
      }
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    runVerification()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Аудит документации</h1>
        <Button onClick={runVerification} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Проверка...
            </>
          ) : (
            'Запустить проверку заново'
          )}
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-slate-400" />
          <p className="mt-4 text-slate-500">Выполняется сверка данных...</p>
        </div>
      )}

      {error && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <XCircle /> Ошибка при проверке
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-300">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Общая статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Диаграмм в реестре (`registry.ts`): <strong>{result.total_in_registry}</strong></p>
              <p>Файлов диаграмм (`.mmd`) в проекте: <strong>{result.total_in_fs}</strong></p>
              {result.total_in_registry === result.total_in_fs && result.missing_in_fs.length === 0 && result.missing_in_registry.length === 0 ? (
                 <p className="flex items-center gap-2 text-green-400 pt-2"><CheckCircle /> Все диаграммы синхронизированы!</p>
              ) : (
                 <p className="flex items-center gap-2 text-yellow-400 pt-2"><AlertTriangle /> Обнаружены несоответствия.</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-400" /> Несоответствия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Отсутствуют в файловой системе ({result.missing_in_fs.length}):</h3>
                {result.missing_in_fs.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                    {result.missing_in_fs.map(file => <li key={file}>`{file}`</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-green-400">Нет.</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Не зарегистрированы в `registry.ts` ({result.missing_in_registry.length}):</h3>
                {result.missing_in_registry.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-yellow-400 space-y-1">
                    {result.missing_in_registry.map(file => <li key={file}>`{file}`</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-green-400">Нет.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
