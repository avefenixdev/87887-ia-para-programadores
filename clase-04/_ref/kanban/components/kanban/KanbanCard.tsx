"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, CheckSquare } from "lucide-react";
import type { Card as CardType } from "@/types/board";
import { useBoard } from "@/context/BoardContext";
import { cn } from "@/lib/utils";

interface KanbanCardProps {
  card: CardType;
}

export function KanbanCard({ card }: KanbanCardProps) {
  const { selectCard } = useBoard();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
    data: { card },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const completedSubtasks = card.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = card.subtasks.length;

  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => selectCard(card)}
      className={cn(
        "cursor-grab rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing",
        isDragging && "opacity-50 shadow-lg ring-2 ring-primary"
      )}
    >
      {/* Labels */}
      {card.labels.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {card.labels.map((label) => (
            <span
              key={label.id}
              className="rounded px-2 py-0.5 text-[10px] font-medium text-white"
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="mb-2 text-sm font-medium text-foreground">{card.title}</h3>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {/* Priority Badge */}
        <span
          className={cn(
            "rounded border px-1.5 py-0.5 text-[10px] font-medium capitalize",
            priorityColors[card.priority]
          )}
        >
          {card.priority}
        </span>

        {/* Due Date */}
        {card.dueDate && (
          <span
            className={cn(
              "flex items-center gap-1",
              isOverdue && "font-medium text-red-600"
            )}
          >
            <Calendar className="h-3 w-3" />
            {new Date(card.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}

        {/* Subtasks Progress */}
        {totalSubtasks > 0 && (
          <span className="flex items-center gap-1">
            <CheckSquare className="h-3 w-3" />
            {completedSubtasks}/{totalSubtasks}
          </span>
        )}
      </div>

      {/* Members */}
      {card.members.length > 0 && (
        <div className="mt-3 flex -space-x-1">
          {card.members.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-primary text-[10px] font-medium text-primary-foreground"
              title={member.name}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          ))}
          {card.members.length > 3 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-medium text-muted-foreground">
              +{card.members.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
