export type Priority = "low" | "medium" | "high";

export type ColumnId = "backlog" | "todo" | "in-progress" | "done";

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Member {
  id: string;
  name: string;
  avatar?: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  labels: Label[];
  members: Member[];
  subtasks: Subtask[];
  columnId: ColumnId;
  createdAt: string;
}

export interface Column {
  id: ColumnId;
  title: string;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface BoardState {
  board: Board;
  searchQuery: string;
  filters: {
    priority: Priority | null;
    labelId: string | null;
    memberId: string | null;
  };
  selectedCard: Card | null;
}

export type BoardAction =
  | { type: "SET_BOARD"; payload: Board }
  | { type: "MOVE_CARD"; payload: { cardId: string; fromColumnId: ColumnId; toColumnId: ColumnId; newIndex: number } }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_PRIORITY_FILTER"; payload: Priority | null }
  | { type: "SET_LABEL_FILTER"; payload: string | null }
  | { type: "SET_MEMBER_FILTER"; payload: string | null }
  | { type: "SELECT_CARD"; payload: Card | null }
  | { type: "UPDATE_CARD"; payload: Card }
  | { type: "DELETE_CARD"; payload: string }
  | { type: "ADD_CARD"; payload: { columnId: ColumnId; card: Card } };
