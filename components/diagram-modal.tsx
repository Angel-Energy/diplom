"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface DiagramModalProps {
  svgContent: string
  title: string
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DiagramModal({
  svgContent,
  title,
  children,
  open,
  onOpenChange,
}: DiagramModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] bg-slate-900/80 backdrop-blur-sm border-slate-700 flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-slate-200">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow h-0 w-full border border-slate-700 rounded-lg overflow-hidden">
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div className="absolute top-4 right-20 z-10 flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                    onClick={() => zoomIn()}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                    onClick={() => zoomOut()}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                    onClick={() => resetTransform()}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                  contentStyle={{ width: "100%", height: "100%" }}
                >
                  <div
                    className="w-full h-full flex justify-center items-center"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </DialogContent>
    </Dialog>
  )
} 