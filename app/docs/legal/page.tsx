import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scale, Shield, FileText, Download } from "lucide-react"
import Image from "next/image"

export default function LegalPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Юридическая информация
        </h1>
        <p className="text-xl text-slate-300">Лицензии, условия использования и политика конфиденциальности</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
            MIT License
          </Badge>
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
            Open Source
          </Badge>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
            GDPR Compliant
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Scale className="h-6 w-6 text-green-400" />
                <div>
                  <CardTitle className="text-white">MIT License</CardTitle>
                  <CardDescription className="text-slate-400">
                    Открытая лицензия для свободного использования
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-green-500 text-green-400 hover:bg-green-500/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                {`MIT License

Copyright (c) 2024 Сообщение 404

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-cyan-400" />
                <div>
                  <CardTitle className="text-white">Terms of Service</CardTitle>
                  <CardDescription className="text-slate-400">Условия использования игры и сервисов</CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-semibold">Основные положения</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Игра предоставляется "как есть" без гарантий</li>
                <li>• Пользователи несут ответственность за свои действия</li>
                <li>• Запрещено использование читов и эксплойтов</li>
                <li>• Администрация оставляет право модерации контента</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-purple-400 font-semibold">Ограничения</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Возрастное ограничение: 12+</li>
                <li>• Запрет на коммерческое использование без разрешения</li>
                <li>• Ограничения на реверс-инжиниринг</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image src="/file.svg" alt="Privacy Policy Icon" width={24} height={24} className="h-6 w-6" style={{width: 24, height: 24}} />
                <div>
                  <CardTitle className="text-white">Privacy Policy</CardTitle>
                  <CardDescription className="text-slate-400">
                    Политика конфиденциальности и защиты данных
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-purple-400 font-semibold">Сбор данных</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Игровая статистика и прогресс</li>
                <li>• Технические данные устройства</li>
                <li>• Аналитика использования приложения</li>
                <li>• Данные для улучшения игрового опыта</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-semibold">Защита данных</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Шифрование всех передаваемых данных</li>
                <li>• Соответствие требованиям GDPR</li>
                <li>• Право на удаление персональных данных</li>
                <li>• Регулярный аудит безопасности</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-semibold">Юридические вопросы</h4>
              <p className="text-slate-300 text-sm">legal@message404.game</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-purple-400 font-semibold">Техническая поддержка</h4>
              <p className="text-slate-300 text-sm">support@message404.game</p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">Последнее обновление: 15 января 2024 года</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
