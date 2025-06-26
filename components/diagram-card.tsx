import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface DiagramCardProps {
  title: string
  description: string
  category: string
  imageSrc: string
  conclusion?: string
}

export function DiagramCard({ title, description, category, imageSrc, conclusion }: DiagramCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{title}</CardTitle>
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
            {category}
          </Badge>
        </div>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg overflow-hidden border border-slate-700">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} width={600} height={400} className="w-full h-auto" style={{width: 600, height: 400}} priority />
        </div>
        {conclusion && (
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">Вывод:</h4>
            <p className="text-sm text-slate-300">{conclusion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
