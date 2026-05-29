"use client";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useBoard } from "@/context/BoardContext";
import { boardService } from "@/services/boardService";
import { Navbar } from "./Navbar";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { CardDetailPanel } from "./CardDetailPanel";
import { AddCardModal } from "./AddCardModal";
import type { Card, ColumnId } from "@/types/board";

export function KanbanBoard() {
  const { state, setBoard, moveCard, selectCard } = useBoard();
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [addCardColumn, setAddCardColumn] = useState<ColumnId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const board = await boardService.getBoard();
        setBoard(board);
      } finally {
        setIsLoading(false);
      }
    };
    loadBoard();
  }, [setBoard]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = active.data.current?.card as Card;
    if (card) {
      setActiveCard(card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const card = active.data.current?.card as Card;
    if (!card) return;

    const toColumnId = over.id as ColumnId;
    const fromColumnId = card.columnId;

    if (fromColumnId !== toColumnId) {
      const toColumn = state.board.columns.find((c) => c.id === toColumnId);
      const newIndex = toColumn?.cards.length || 0;
      moveCard(card.id, fromColumnId, toColumnId, newIndex);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading board...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen flex-col bg-background">
        <Navbar />

        {/* Board */}
        <main className="flex-1 overflow-x-auto p-6">
          <div className="flex h-full gap-4">
            {state.board.columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onAddCard={() => setAddCardColumn(column.id)}
              />
            ))}
          </div>
        </main>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeCard && (
            <div className="rotate-3 scale-105">
              <KanbanCard card={activeCard} />
            </div>
          )}
        </DragOverlay>

        {/* Card Detail Panel */}
        {state.selectedCard && (
          <CardDetailPanel
            card={state.selectedCard}
            onClose={() => selectCard(null)}
          />
        )}

        {/* Add Card Modal */}
        {addCardColumn && (
          <AddCardModal
            columnId={addCardColumn}
            onClose={() => setAddCardColumn(null)}
          />
        )}
      </div>
    </DndContext>
  );
}
