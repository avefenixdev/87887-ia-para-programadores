"use client";

import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import type { Column as ColumnType, Card } from "@/types/board";
import { KanbanCard } from "./KanbanCard";
import { useBoard } from "@/context/BoardContext";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  column: ColumnType;
  onAddCard: () => void;
}

export function KanbanColumn({ column, onAddCard }: KanbanColumnProps) {
  const { getFilteredCards } = useBoard();
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { column },
  });

  const filteredCards = getFilteredCards(column.cards);

  const columnColors: Record<string, string> = {
    backlog: "bg-slate-500",
    todo: "bg-blue-500",
    "in-progress": "bg-amber-500",
    done: "bg-emerald-500",
  };

  return (
    <div className="flex h-full w-72 flex-shrink-0 flex-col">
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", columnColors[column.id])} />
          <h2 className="text-sm font-semibold text-foreground">{column.title}</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {filteredCards.length}
          </span>
        </div>
        <button
          onClick={onAddCard}
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Cards Container */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-2 overflow-y-auto rounded-lg bg-muted/50 p-2 transition-colors",
          isOver && "bg-primary/10 ring-2 ring-primary/30"
        )}
      >
        {filteredCards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}
        {filteredCards.length === 0 && (
          <div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
            No cards
          </div>
        )}
      </div>
    </div>
  );
}
