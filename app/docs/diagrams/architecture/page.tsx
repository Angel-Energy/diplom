import CategoryPageTemplate from '@/components/category-page-template'
import { Layers } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function ArchitectureDiagramsPage() {
  return (
    <CategoryPageTemplate
      categoryId="architecture"
      categoryIcon={<Layers className="h-5 w-5" />}
      categoryColor="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
    >
      <Card>
        <CardHeader>
          <CardTitle>Архитектурные диаграммы</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Архитектурные диаграммы отражают структуру, взаимодействие и разделение ответственности между основными компонентами мобильной игры «Сообщение 404». Они охватывают слои MVVM, Clean Architecture, интеграцию Jetpack Compose, работу с Room, Ktor, Chaquopy и организацию клиент-серверного взаимодействия.
          </p>
          <ul className="mb-2 list-disc list-inside text-sm">
            <li><b>Назначение:</b> Формализовать архитектуру приложения, упростить навигацию по коду, обеспечить масштабируемость и безопасность.</li>
            <li><b>Аспекты:</b> Слои Presentation/Domain/Data, взаимодействие с сервером, офлайн-режим, шифрование, модульность, поддержка тёмной темы.</li>
            <li><b>Роли:</b> Архитектор, Android-разработчик, DevOps, UI/UX-дизайнер, специалист по безопасности.</li>
            <li><b>Рекомендации:</b> Использовать при проектировании новых фич, ревью архитектуры, обучении новых участников команды.</li>
            <li><b>Для кого:</b> Разработчики, архитекторы, тестировщики, технические писатели.</li>
            <li><b>Стандарты:</b> Clean Architecture, MVVM, ГОСТ 19.701-90, ISO/IEC 25010, 27001.</li>
          </ul>
        </CardContent>
      </Card>
    </CategoryPageTemplate>
  )
}
