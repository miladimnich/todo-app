// app/hooks/useTasks.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, NewTask } from "../types/task";
import * as api from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async (options?: { status?: "all" | "done" | "undone"; sort?: "priority:asc" | "priority:desc" }) => {
    setLoading(true);
    try {
      const data = await api.fetchTasks(options);
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
    await api.updateTask(task.id, { completed: !task.completed });
    await loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return { tasks, loading, loadTasks, addTask, removeTask, toggleTask };
}
