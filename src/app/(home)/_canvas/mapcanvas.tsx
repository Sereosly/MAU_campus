"use client"

import React, {useEffect, useRef, useState} from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/shared/ui/context-menu"
import {MapPin, Play, Flag, Pin} from 'lucide-react'

interface MultiSvgMapProps {
  svgs: Array<{
    path: string;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
  }>;
  realBounds: {
    lat_min: number;
    lng_min: number;
    lat_max: number;
    lng_max: number;
  };
}

const MultiSvgMap: React.FC<MultiSvgMapProps> = ({ svgs, realBounds }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouchPos, setLastTouchPos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 1000 });

  const MIN_SCALE = 0.8;
  const MAX_SCALE = 5;
  const INITIAL_SCALE_FACTOR = 1.5;
  const SVG_SIZE = 2000; // Увеличенный размер SVG

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });

        // Рассчитываем начальный масштаб, чтобы вся карта поместилась на экране
        const scaleX = width / SVG_SIZE;
        const scaleY = height / SVG_SIZE;
        let newScale = Math.min(scaleX, scaleY) * INITIAL_SCALE_FACTOR;
        newScale = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE));
        setScale(newScale);

        // Устанавливаем начальное смещение
        setOffset({
          x: 0,
          y: 0
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleZoom = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const zoomIntensity = 0.1;
    const delta = event.deltaY > 0 ? -zoomIntensity : zoomIntensity;
    const newScale = Math.max(MIN_SCALE, Math.min(scale + delta, MAX_SCALE));

    const rect = containerRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newOffset = {
      x: x - (x - offset.x) * (newScale / scale),
      y: y - (y - offset.y) * (newScale / scale)
    };

    setScale(newScale);
    setOffset(newOffset);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      setIsDragging(true);
      setLastTouchPos({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || event.touches.length !== 1) return;

    const deltaX = event.touches[0].clientX - lastTouchPos.x;
    const deltaY = event.touches[0].clientY - lastTouchPos.y;

    setOffset((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setLastTouchPos({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setLastTouchPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - lastTouchPos.x;
    const deltaY = event.clientY - lastTouchPos.y;

    setOffset((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setLastTouchPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          ref={containerRef}
          onWheel={handleZoom}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-screen overflow-hidden touch-action-none"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
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
                transformOrigin: '0 0',
              }}
            >
              <image
                href={svg.path}
                width={SVG_SIZE}
                height={SVG_SIZE}
                x={svg.offsetX}
                y={svg.offsetY}
              />
            </svg>
          ))}
        </div>
      </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem>
                    <Play className="mr-2 h-4 w-4"/>
                    <span>Установить начальную точку</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Flag className="mr-2 h-4 w-4"/>
                    <span>Установить конечную точку</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Pin className="mr-2 h-4 w-4"/>
                    <span>Оставить заметку</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <MapPin className="mr-2 h-4 w-4"/>
                    <span>Что здесь</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default MultiSvgMap