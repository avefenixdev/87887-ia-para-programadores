"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import type { ColumnId, Priority, Card, Subtask } from "@/types/board";
import { useBoard } from "@/context/BoardContext";
import { availableLabels, teamMembers } from "@/services/boardService";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddCardModalProps {
  columnId: ColumnId;
  onClose: () => void;
}

export function AddCardModal({ columnId, onClose }: AddCardModalProps) {
  const { addCard } = useBoard();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<typeof availableLabels>([]);
  const [selectedMembers, setSelectedMembers] = useState<typeof teamMembers>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newCard: Card = {
      id: Math.random().toString(36).substring(2, 11),
      title,
      description: description || undefined,
      priority,
      dueDate: dueDate || undefined,
      labels: selectedLabels,
      members: selectedMembers,
      subtasks,
      columnId,
      createdAt: new Date().toISOString(),
    };

    addCard(columnId, newCard);
    onClose();
  };

  const toggleLabel = (label: (typeof availableLabels)[0]) => {
    const isSelected = selectedLabels.some((l) => l.id === label.id);
    setSelectedLabels(
      isSelected
        ? selectedLabels.filter((l) => l.id !== label.id)
        : [...selectedLabels, label]
    );
  };

  const toggleMember = (member: (typeof teamMembers)[0]) => {
    const isSelected = selectedMembers.some((m) => m.id === member.id);
    setSelectedMembers(
      isSelected
        ? selectedMembers.filter((m) => m.id !== member.id)
        : [...selectedMembers, member]
    );
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([
      ...subtasks,
      {
        id: Math.random().toString(36).substring(2, 11),
        title: newSubtask,
        completed: false,
      },
    ]);
    setNewSubtask("");
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const priorities: { value: Priority; label: string; color: string }[] = [
    { value: "high", label: "High", color: "bg-red-500" },
    { value: "medium", label: "Medium", color: "bg-amber-500" },
    { value: "low", label: "Low", color: "bg-emerald-500" },
  ];

  const columnNames: Record<ColumnId, string> = {
    backlog: "Backlog",
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-card p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Add New Card</h2>
            <p className="text-sm text-muted-foreground">
              Adding to {columnNames[columnId]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter card title..."
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Add a description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Priority
              </label>
              <div className="flex gap-1">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPriority(p.value)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-medium transition-colors",
                      priority === p.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", p.color)} />
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Labels
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableLabels.map((label) => {
                const isSelected = selectedLabels.some((l) => l.id === label.id);
                return (
                  <button
                    key={label.id}
                    onClick={() => toggleLabel(label)}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium text-white transition-opacity",
                      isSelected ? "opacity-100 ring-2 ring-offset-1" : "opacity-50 hover:opacity-75"
                    )}
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Assign Members
            </label>
            <div className="flex flex-wrap gap-1.5">
              {teamMembers.map((member) => {
                const isSelected = selectedMembers.some((m) => m.id === member.id);
                return (
                  <button
                    key={member.id}
                    onClick={() => toggleMember(member)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-medium text-primary-foreground">
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
              Subtasks
            </label>
            {subtasks.length > 0 && (
              <div className="mb-2 space-y-1">
                {subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center justify-between rounded border border-border bg-background px-2 py-1 text-sm"
                  >
                    <span className="text-foreground">{subtask.title}</span>
                    <button
                      onClick={() => removeSubtask(subtask.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                placeholder="Add subtask..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                onClick={addSubtask}
                size="sm"
                variant="outline"
                disabled={!newSubtask.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={!title.trim()}>
            Add Card
          </Button>
        </div>
      </div>
    </div>
  );
}
