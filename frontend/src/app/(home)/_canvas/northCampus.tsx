"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { MapPin, Play, Flag, Pin, ZoomIn, ZoomOut } from "lucide-react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/shared/ui/context-menu"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/shared/ui/input"

interface NorthCampusMapProps {
  svgs: Array<{
    path: string
    width: number
    height: number
    offsetX: number
    offsetY: number
  }>
  realBounds: {
    lat_min: number
    lng_min: number
    lat_max: number
    lng_max: number
  }
}

export const NorthCampusMap = ({ svgs, realBounds }: NorthCampusMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastTouchPos, setLastTouchPos] = useState({ x: 0, y: 0 })
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 1000 })

  const MIN_SCALE = 0.8
  const MAX_SCALE = 10
  const INITIAL_SCALE_FACTOR = 1
  const SVG_SIZE = 1000

  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setContainerSize({ width, height })

      const scaleX = width / SVG_SIZE
      const scaleY = height / SVG_SIZE
      let newScale = Math.min(scaleX, scaleY) * INITIAL_SCALE_FACTOR
      newScale = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE))
      console.log(scaleX)
      setScale(newScale)

      setOffset({
        x: (width - SVG_SIZE * newScale) / 2,
        y: (height - SVG_SIZE * newScale) / 2,
      })
    }
  }, [])

  useEffect(() => {
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [updateSize])

  const handleZoom = useCallback(
    (delta: number, centerX: number, centerY: number) => {
      const zoomIntensity = 0.3
      const newScale = Math.max(MIN_SCALE, Math.min(scale + delta * zoomIntensity, MAX_SCALE))

      const newOffset = {
        x: centerX - (centerX - offset.x) * (newScale / scale),
        y: centerY - (centerY - offset.y) * (newScale / scale),
      }

      setScale(newScale)
      setOffset(newOffset)
    },
    [scale, offset],
  )

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault()
      const rect = containerRef.current!.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      handleZoom(event.deltaY > 0 ? -1 : 1, x, y)
    },
    [handleZoom],
  )

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      setIsDragging(true)
      setLastTouchPos({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      })
    }
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || event.touches.length !== 1) return

    const deltaX = event.touches[0].clientX - lastTouchPos.x
    const deltaY = event.touches[0].clientY - lastTouchPos.y

    setOffset((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }))

    setLastTouchPos({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setLastTouchPos({ x: event.clientX, y: event.clientY })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const deltaX = event.clientX - lastTouchPos.x
    const deltaY = event.clientY - lastTouchPos.y

    setOffset((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }))

    setLastTouchPos({ x: event.clientX, y: event.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    const centerX = containerSize.width / 2
    const centerY = containerSize.height / 2
    handleZoom(1, centerX, centerY)
  }

  const handleZoomOut = () => {
    const centerX = containerSize.width / 2
    const centerY = containerSize.height / 2
    handleZoom(-1, centerX, centerY)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-screen overflow-hidden touch-action-none"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {svgs.map((svg, index) => (
            <svg
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              preserveAspectRatio="xMinYMin meet"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: "0 0",
              }}
            >
              <image href={svg.path} width={SVG_SIZE} height={SVG_SIZE} x={svg.offsetX} y={svg.offsetY} />
            </svg>
          ))}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-72">
        <ContextMenuItem>
          <Play className="mr-2 h-4 w-4" />
          Установить начальную точку
        </ContextMenuItem>
        <ContextMenuItem>
          <Flag className="mr-2 h-4 w-4" />
          Установить конечную точку
        </ContextMenuItem>
        <ContextMenuItem>
          <Pin className="mr-2 h-4 w-4" />
          Оставить заметку
        </ContextMenuItem>
        <ContextMenuItem>
          <MapPin className="mr-2 h-4 w-4" />
          Что здесь
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Создать</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Новое здание</ContextMenuItem>
            <ContextMenuItem>Новый этаж</ContextMenuItem>
            <ContextMenuItem>Новый коридор</ContextMenuItem>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="contextMenuItem" size="contextMenuItem">Новый кабинет</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" placeholder="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" placeholder="@peduarte" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}


