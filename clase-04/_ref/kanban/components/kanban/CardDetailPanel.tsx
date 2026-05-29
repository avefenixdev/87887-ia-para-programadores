"use client";

import { useState } from "react";
import { X, Trash2, Plus, Check } from "lucide-react";
import type { Card, Priority, Subtask, Label, Member } from "@/types/board";
import { useBoard } from "@/context/BoardContext";
import { availableLabels, teamMembers } from "@/services/boardService";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CardDetailPanelProps {
  card: Card;
  onClose: () => void;
}

export function CardDetailPanel({ card, onClose }: CardDetailPanelProps) {
  const { updateCard, deleteCard } = useBoard();
  const [editedCard, setEditedCard] = useState<Card>({ ...card });
  const [newSubtask, setNewSubtask] = useState("");

  const handleSave = () => {
    updateCard(editedCard);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCard(card.id);
      onClose();
    }
  };

  const toggleSubtask = (subtaskId: string) => {
    setEditedCard({
      ...editedCard,
      subtasks: editedCard.subtasks.map((s) =>
        s.id === subtaskId ? { ...s, completed: !s.completed } : s
      ),
    });
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    const newSub: Subtask = {
      id: Math.random().toString(36).substring(2, 11),
      title: newSubtask,
      completed: false,
    };
    setEditedCard({
      ...editedCard,
      subtasks: [...editedCard.subtasks, newSub],
    });
    setNewSubtask("");
  };

  const removeSubtask = (subtaskId: string) => {
    setEditedCard({
      ...editedCard,
      subtasks: editedCard.subtasks.filter((s) => s.id !== subtaskId),
    });
  };

  const toggleLabel = (label: Label) => {
    const hasLabel = editedCard.labels.some((l) => l.id === label.id);
    setEditedCard({
      ...editedCard,
      labels: hasLabel
        ? editedCard.labels.filter((l) => l.id !== label.id)
        : [...editedCard.labels, label],
    });
  };

  const toggleMember = (member: Member) => {
    const hasMember = editedCard.members.some((m) => m.id === member.id);
    setEditedCard({
      ...editedCard,
      members: hasMember
        ? editedCard.members.filter((m) => m.id !== member.id)
        : [...editedCard.members, member],
    });
  };

  const priorities: { value: Priority; label: string; color: string }[] = [
    { value: "high", label: "High", color: "bg-red-500" },
    { value: "medium", label: "Medium", color: "bg-amber-500" },
    { value: "low", label: "Low", color: "bg-emerald-500" },
  ];

  const completedCount = editedCard.subtasks.filter((s) => s.completed).length;
  const totalCount = editedCard.subtasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Card Details</h2>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
            <button
              onClick={onClose}
              className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Title
            </label>
            <input
              type="text"
              value={editedCard.title}
              onChange={(e) =>
                setEditedCard({ ...editedCard, title: e.target.value })
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              value={editedCard.description || ""}
              onChange={(e) =>
                setEditedCard({ ...editedCard, description: e.target.value })
              }
              rows={3}
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Add a description..."
            />
          </div>

          {/* Priority */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Priority
            </label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  onClick={() =>
                    setEditedCard({ ...editedCard, priority: p.value })
                  }
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                    editedCard.priority === p.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <span className={cn("h-2 w-2 rounded-full", p.color)} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Due Date
            </label>
            <input
              type="date"
              value={editedCard.dueDate || ""}
              onChange={(e) =>
                setEditedCard({ ...editedCard, dueDate: e.target.value })
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Labels */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Labels
            </label>
            <div className="flex flex-wrap gap-2">
              {availableLabels.map((label) => {
                const isSelected = editedCard.labels.some(
                  (l) => l.id === label.id
                );
                return (
                  <button
                    key={label.id}
                    onClick={() => toggleLabel(label)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all",
                      isSelected
                        ? "text-white ring-2 ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    )}
                    style={{
                      backgroundColor: label.color,
                      ringColor: isSelected ? label.color : undefined,
                    }}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    {label.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Assigned Members
            </label>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((member) => {
                const isSelected = editedCard.members.some(
                  (m) => m.id === member.id
                );
                return (
                  <button
                    key={member.id}
                    onClick={() => toggleMember(member)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    {member.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Subtasks ({completedCount}/{totalCount})
            </label>
            {totalCount > 0 && (
              <div className="mb-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <div className="space-y-2">
              {editedCard.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background p-2"
                >
                  <button
                    onClick={() => toggleSubtask(subtask.id)}
                    className={cn(
                      "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors",
                      subtask.completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background"
                    )}
                  >
                    {subtask.completed && <Check className="h-3 w-3" />}
                  </button>
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      subtask.completed &&
                        "text-muted-foreground line-through"
                    )}
                  >
                    {subtask.title}
                  </span>
                  <button
                    onClick={() => removeSubtask(subtask.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                  placeholder="Add subtask..."
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button onClick={addSubtask} size="sm" disabled={!newSubtask.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
