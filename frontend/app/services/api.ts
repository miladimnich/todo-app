// app/services/api.ts
import { Task, NewTask } from "../types/task";

// Fetch all tasks
export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

// Add a new task
export async function addTask(task: NewTask): Promise<Task> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
}

// Remove a task
export async function removeTask(id: number): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove task");
}
