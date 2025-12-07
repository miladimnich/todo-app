import { useState, useEffect, useCallback } from "react";
import { Task, NewTask } from "../types/task";
import * as api from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (task: NewTask) => {
    await api.addTask(task);
    await loadTasks();
  };

  const removeTask = async (id: number) => {
    await api.removeTask(id);
    await loadTasks();
  };

  const toggleTask = async (task: Task) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    await loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return { tasks, loading, addTask, removeTask, toggleTask };
}
