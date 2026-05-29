"use client";

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import type { BoardState, BoardAction, Card, ColumnId, Priority, Board } from "@/types/board";

const initialState: BoardState = {
  board: {
    id: "",
    title: "",
    columns: [],
  },
  searchQuery: "",
  filters: {
    priority: null,
    labelId: null,
    memberId: null,
  },
  selectedCard: null,
};

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "SET_BOARD":
      return { ...state, board: action.payload };

    case "MOVE_CARD": {
      const { cardId, fromColumnId, toColumnId, newIndex } = action.payload;
      const newColumns = state.board.columns.map((col) => ({ ...col, cards: [...col.cards] }));

      const fromColumn = newColumns.find((c) => c.id === fromColumnId);
      const toColumn = newColumns.find((c) => c.id === toColumnId);

      if (!fromColumn || !toColumn) return state;

      const cardIndex = fromColumn.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return state;

      const [card] = fromColumn.cards.splice(cardIndex, 1);
      card.columnId = toColumnId;
      toColumn.cards.splice(newIndex, 0, card);

      return { ...state, board: { ...state.board, columns: newColumns } };
    }

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "SET_PRIORITY_FILTER":
      return { ...state, filters: { ...state.filters, priority: action.payload } };

    case "SET_LABEL_FILTER":
      return { ...state, filters: { ...state.filters, labelId: action.payload } };

    case "SET_MEMBER_FILTER":
      return { ...state, filters: { ...state.filters, memberId: action.payload } };

    case "SELECT_CARD":
      return { ...state, selectedCard: action.payload };

    case "UPDATE_CARD": {
      const newColumns = state.board.columns.map((col) => ({
        ...col,
        cards: col.cards.map((c) => (c.id === action.payload.id ? action.payload : c)),
      }));
      return {
        ...state,
        board: { ...state.board, columns: newColumns },
        selectedCard: action.payload,
      };
    }

    case "DELETE_CARD": {
      const newColumns = state.board.columns.map((col) => ({
        ...col,
        cards: col.cards.filter((c) => c.id !== action.payload),
      }));
      return {
        ...state,
        board: { ...state.board, columns: newColumns },
        selectedCard: null,
      };
    }

    case "ADD_CARD": {
      const newColumns = state.board.columns.map((col) =>
        col.id === action.payload.columnId
          ? { ...col, cards: [...col.cards, action.payload.card] }
          : col
      );
      return { ...state, board: { ...state.board, columns: newColumns } };
    }

    default:
      return state;
  }
}

interface BoardContextType {
  state: BoardState;
  setBoard: (board: Board) => void;
  moveCard: (cardId: string, fromColumnId: ColumnId, toColumnId: ColumnId, newIndex: number) => void;
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (priority: Priority | null) => void;
  setLabelFilter: (labelId: string | null) => void;
  setMemberFilter: (memberId: string | null) => void;
  selectCard: (card: Card | null) => void;
  updateCard: (card: Card) => void;
  deleteCard: (cardId: string) => void;
  addCard: (columnId: ColumnId, card: Card) => void;
  getFilteredCards: (cards: Card[]) => Card[];
}

const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const setBoard = useCallback((board: Board) => {
    dispatch({ type: "SET_BOARD", payload: board });
  }, []);

  const moveCard = useCallback(
    (cardId: string, fromColumnId: ColumnId, toColumnId: ColumnId, newIndex: number) => {
      dispatch({ type: "MOVE_CARD", payload: { cardId, fromColumnId, toColumnId, newIndex } });
    },
    []
  );

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);

  const setPriorityFilter = useCallback((priority: Priority | null) => {
    dispatch({ type: "SET_PRIORITY_FILTER", payload: priority });
  }, []);

  const setLabelFilter = useCallback((labelId: string | null) => {
    dispatch({ type: "SET_LABEL_FILTER", payload: labelId });
  }, []);

  const setMemberFilter = useCallback((memberId: string | null) => {
    dispatch({ type: "SET_MEMBER_FILTER", payload: memberId });
  }, []);

  const selectCard = useCallback((card: Card | null) => {
    dispatch({ type: "SELECT_CARD", payload: card });
  }, []);

  const updateCard = useCallback((card: Card) => {
    dispatch({ type: "UPDATE_CARD", payload: card });
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    dispatch({ type: "DELETE_CARD", payload: cardId });
  }, []);

  const addCard = useCallback((columnId: ColumnId, card: Card) => {
    dispatch({ type: "ADD_CARD", payload: { columnId, card } });
  }, []);

  const getFilteredCards = useCallback(
    (cards: Card[]) => {
      return cards.filter((card) => {
        // Search filter
        if (
          state.searchQuery &&
          !card.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Priority filter
        if (state.filters.priority && card.priority !== state.filters.priority) {
          return false;
        }

        // Label filter
        if (
          state.filters.labelId &&
          !card.labels.some((l) => l.id === state.filters.labelId)
        ) {
          return false;
        }

        // Member filter
        if (
          state.filters.memberId &&
          !card.members.some((m) => m.id === state.filters.memberId)
        ) {
          return false;
        }

        return true;
      });
    },
    [state.searchQuery, state.filters]
  );

  return (
    <BoardContext.Provider
      value={{
        state,
        setBoard,
        moveCard,
        setSearchQuery,
        setPriorityFilter,
        setLabelFilter,
        setMemberFilter,
        selectCard,
        updateCard,
        deleteCard,
        addCard,
        getFilteredCards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
}
