import type { Board, Card, ColumnId, Label, Member } from "@/types/board";

// Available labels for the board
export const availableLabels: Label[] = [
  { id: "l1", name: "Bug", color: "#ef4444" },
  { id: "l2", name: "Feature", color: "#3b82f6" },
  { id: "l3", name: "Enhancement", color: "#10b981" },
  { id: "l4", name: "Documentation", color: "#f59e0b" },
  { id: "l5", name: "Design", color: "#8b5cf6" },
];

// Team members
export const teamMembers: Member[] = [
  { id: "m1", name: "Alice Chen" },
  { id: "m2", name: "Bob Smith" },
  { id: "m3", name: "Carol Johnson" },
  { id: "m4", name: "David Lee" },
  { id: "m5", name: "Emma Wilson" },
];

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Initial seed data
const initialBoard: Board = {
  id: "board-1",
  title: "Project Alpha",
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      cards: [
        {
          id: generateId(),
          title: "Research competitor analysis",
          description: "Analyze top 5 competitors and document their features, pricing, and user experience.",
          priority: "low",
          dueDate: "2026-06-15",
          labels: [availableLabels[3]],
          members: [teamMembers[0]],
          subtasks: [
            { id: generateId(), title: "List competitors", completed: true },
            { id: generateId(), title: "Document features", completed: false },
            { id: generateId(), title: "Create comparison matrix", completed: false },
          ],
          columnId: "backlog",
          createdAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          title: "Set up analytics dashboard",
          description: "Integrate analytics tools and create a dashboard for tracking key metrics.",
          priority: "medium",
          dueDate: "2026-06-20",
          labels: [availableLabels[1], availableLabels[2]],
          members: [teamMembers[2], teamMembers[3]],
          subtasks: [
            { id: generateId(), title: "Choose analytics provider", completed: true },
            { id: generateId(), title: "Set up tracking", completed: false },
            { id: generateId(), title: "Create dashboard", completed: false },
            { id: generateId(), title: "Add custom events", completed: false },
          ],
          columnId: "backlog",
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "todo",
      title: "To Do",
      cards: [
        {
          id: generateId(),
          title: "Design new landing page",
          description: "Create a modern, conversion-focused landing page design with A/B testing variants.",
          priority: "high",
          dueDate: "2026-05-28",
          labels: [availableLabels[4], availableLabels[1]],
          members: [teamMembers[1]],
          subtasks: [
            { id: generateId(), title: "Create wireframes", completed: true },
            { id: generateId(), title: "Design mockups", completed: true },
            { id: generateId(), title: "Get stakeholder approval", completed: false },
          ],
          columnId: "todo",
          createdAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          title: "Fix authentication bug",
          description: "Users are being logged out unexpectedly after 30 minutes of inactivity.",
          priority: "high",
          dueDate: "2026-05-27",
          labels: [availableLabels[0]],
          members: [teamMembers[4]],
          subtasks: [
            { id: generateId(), title: "Reproduce issue", completed: true },
            { id: generateId(), title: "Identify root cause", completed: false },
            { id: generateId(), title: "Implement fix", completed: false },
            { id: generateId(), title: "Write tests", completed: false },
          ],
          columnId: "todo",
          createdAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          title: "Update API documentation",
          description: "Document all new endpoints added in v2.0 release.",
          priority: "medium",
          dueDate: "2026-06-05",
          labels: [availableLabels[3]],
          members: [teamMembers[0], teamMembers[2]],
          subtasks: [
            { id: generateId(), title: "List new endpoints", completed: true },
            { id: generateId(), title: "Write descriptions", completed: true },
            { id: generateId(), title: "Add code examples", completed: false },
          ],
          columnId: "todo",
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [
        {
          id: generateId(),
          title: "Implement user onboarding flow",
          description: "Create a step-by-step onboarding experience for new users with progress tracking.",
          priority: "high",
          dueDate: "2026-06-01",
          labels: [availableLabels[1], availableLabels[4]],
          members: [teamMembers[1], teamMembers[4]],
          subtasks: [
            { id: generateId(), title: "Design onboarding screens", completed: true },
            { id: generateId(), title: "Implement step 1", completed: true },
            { id: generateId(), title: "Implement step 2", completed: true },
            { id: generateId(), title: "Implement step 3", completed: false },
            { id: generateId(), title: "Add progress tracking", completed: false },
          ],
          columnId: "in-progress",
          createdAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          title: "Performance optimization",
          description: "Improve page load times and reduce bundle size by 30%.",
          priority: "medium",
          dueDate: "2026-06-10",
          labels: [availableLabels[2]],
          members: [teamMembers[3]],
          subtasks: [
            { id: generateId(), title: "Audit current performance", completed: true },
            { id: generateId(), title: "Implement code splitting", completed: true },
            { id: generateId(), title: "Optimize images", completed: false },
            { id: generateId(), title: "Add caching", completed: false },
          ],
          columnId: "in-progress",
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      cards: [
        {
          id: generateId(),
          title: "Set up CI/CD pipeline",
          description: "Configure automated testing and deployment pipeline using GitHub Actions.",
          priority: "high",
          dueDate: "2026-05-20",
          labels: [availableLabels[2]],
          members: [teamMembers[3]],
          subtasks: [
            { id: generateId(), title: "Set up GitHub Actions", completed: true },
            { id: generateId(), title: "Configure test runner", completed: true },
            { id: generateId(), title: "Add deployment step", completed: true },
          ],
          columnId: "done",
          createdAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          title: "User feedback survey",
          description: "Create and distribute survey to gather user feedback on recent features.",
          priority: "low",
          dueDate: "2026-05-18",
          labels: [availableLabels[3]],
          members: [teamMembers[0], teamMembers[2]],
          subtasks: [
            { id: generateId(), title: "Design survey questions", completed: true },
            { id: generateId(), title: "Set up survey tool", completed: true },
            { id: generateId(), title: "Send to users", completed: true },
            { id: generateId(), title: "Analyze results", completed: true },
          ],
          columnId: "done",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
};

// Simulated async delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Board service with mock API calls
export const boardService = {
  async getBoard(): Promise<Board> {
    await delay(300);
    return JSON.parse(JSON.stringify(initialBoard));
  },

  async updateCard(card: Card): Promise<Card> {
    await delay(200);
    return card;
  },

  async deleteCard(cardId: string): Promise<void> {
    await delay(200);
  },

  async moveCard(
    cardId: string,
    fromColumnId: ColumnId,
    toColumnId: ColumnId,
    newIndex: number
  ): Promise<void> {
    await delay(100);
  },

  async addCard(columnId: ColumnId, card: Omit<Card, "id" | "createdAt">): Promise<Card> {
    await delay(200);
    return {
      ...card,
      id: generateId(),
      createdAt: new Date().toISOString(),
    } as Card;
  },
};
