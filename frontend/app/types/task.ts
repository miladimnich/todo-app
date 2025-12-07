export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}
export type NewTask = Omit<Task, "id" | "completed">;
