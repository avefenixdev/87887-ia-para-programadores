"use client";

import { Search, Filter, X } from "lucide-react";
import { useBoard } from "@/context/BoardContext";
import { availableLabels, teamMembers } from "@/services/boardService";
import type { Priority } from "@/types/board";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const {
    state,
    setSearchQuery,
    setPriorityFilter,
    setLabelFilter,
    setMemberFilter,
  } = useBoard();

  const hasActiveFilters =
    state.filters.priority || state.filters.labelId || state.filters.memberId;

  const clearFilters = () => {
    setPriorityFilter(null);
    setLabelFilter(null);
    setMemberFilter(null);
  };

  const priorities: { value: Priority; label: string; color: string }[] = [
    { value: "high", label: "High", color: "bg-red-500" },
    { value: "medium", label: "Medium", color: "bg-amber-500" },
    { value: "low", label: "Low", color: "bg-emerald-500" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">
            {state.board.title || "Kanban Board"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cards..."
              value={state.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {state.searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Priority Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={state.filters.priority ? "default" : "outline"}
                size="sm"
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Priority
                {state.filters.priority && (
                  <span className="rounded-full bg-primary-foreground px-1.5 py-0.5 text-xs text-primary">
                    1
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {priorities.map((p) => (
                <DropdownMenuItem
                  key={p.value}
                  onClick={() =>
                    setPriorityFilter(state.filters.priority === p.value ? null : p.value)
                  }
                  className="gap-2"
                >
                  <span className={`h-2 w-2 rounded-full ${p.color}`} />
                  {p.label}
                  {state.filters.priority === p.value && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Label Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={state.filters.labelId ? "default" : "outline"}
                size="sm"
              >
                Label
                {state.filters.labelId && (
                  <span className="ml-2 rounded-full bg-primary-foreground px-1.5 py-0.5 text-xs text-primary">
                    1
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLabels.map((label) => (
                <DropdownMenuItem
                  key={label.id}
                  onClick={() =>
                    setLabelFilter(state.filters.labelId === label.id ? null : label.id)
                  }
                  className="gap-2"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: label.color }}
                  />
                  {label.name}
                  {state.filters.labelId === label.id && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Member Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={state.filters.memberId ? "default" : "outline"}
                size="sm"
              >
                Member
                {state.filters.memberId && (
                  <span className="ml-2 rounded-full bg-primary-foreground px-1.5 py-0.5 text-xs text-primary">
                    1
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {teamMembers.map((member) => (
                <DropdownMenuItem
                  key={member.id}
                  onClick={() =>
                    setMemberFilter(state.filters.memberId === member.id ? null : member.id)
                  }
                  className="gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  {member.name}
                  {state.filters.memberId === member.id && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <>
              <DropdownMenuSeparator className="h-6 w-px bg-border" />
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                <X className="mr-1 h-4 w-4" />
                Clear
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
