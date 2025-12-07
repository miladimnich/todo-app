import { Task } from "../types/task";

interface AddTaskPayload {
  title: string;
  priority?: number; // optional, default is 5
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`);
  return res.json();
}

export async function addTask({ title, priority }: AddTaskPayload): Promise<Task> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, priority }),
  });
  return res.json();
}

export async function removeTask(id: number): Promise<void> {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}
