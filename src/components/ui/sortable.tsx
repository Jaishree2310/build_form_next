// components/ui/sortable.tsx
"use client"

import * as React from "react"
import { createContext, useContext, useMemo, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { createPortal } from "react-dom"
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type SortableProps = {
  children: React.ReactNode
  onMove: (details: { activeIndex: number; overIndex: number }) => void
  value: any[]
  overlay?: React.ReactNode
}

type SortableItemProps = {
  id: string
  children: React.ReactNode
}

type SortableContextType = {
  activeId: string | null
  setActiveId: (id: string | null) => void
}

const Context = createContext<SortableContextType>({
  activeId: null,
  setActiveId: () => {},
})

export function Sortable({ children, onMove, value, overlay }: SortableProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null)

    if (!over) return

    if (active.id !== over.id) {
      const activeIndex = value.findIndex((item) => item.id === active.id)
      const overIndex = value.findIndex((item) => item.id === over.id)
      onMove({ activeIndex, overIndex })
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  return (
    <Context.Provider value={{ activeId, setActiveId }}>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={value} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
        {createPortal(
          <DragOverlay>{activeId && overlay}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </Context.Provider>
  )
}

export function SortableItem({
  children,
  id,
  ...props
}: SortableItemProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof SortableItemProps>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...props}
      className={cn("relative", isDragging && "z-50")}
    >
      {children}
    </div>
  )
}

export function SortableDragHandle({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      {...props}
      className={cn(
        "h-9 w-9 shrink-0 cursor-grab active:cursor-grabbing",
        className
      )}
      {...listeners}
    >
      {children}
    </Button>
  )
}

function DragOverlay({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { activeId } = useContext(Context)

  if (!activeId || !children) {
    return null
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 w-full",
        className
      )}
    >
      {children}
    </div>
  )
}