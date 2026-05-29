import { BoardProvider } from "@/context/BoardContext";
import { KanbanBoard } from "@/components/kanban";

export default function Page() {
  return (
    <BoardProvider>
      <KanbanBoard />
    </BoardProvider>
  );
}
