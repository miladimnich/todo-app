"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, NewTask } from "../types/task";
import * as api from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(
    async (options?: {
      status?: "all" | "done" | "undone";
      sort?: "priority:asc" | "priority:desc";
    }) => {
      setLoading(true);
      try {
        const data = await api.fetchTasks(options);
        setTasks(data);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addTask = async (task: NewTask, options?: { status?: "all" | "done" | "undone"; sort?: "priority:asc" | "priority:desc" }) => {
    await api.addTask(task);
    await loadTasks(options);
  };

  const removeTask = async (id: number, options?: { status?: "all" | "done" | "undone"; sort?: "priority:asc" | "priority:desc" }) => {
    await api.removeTask(id);
    await loadTasks(options);
  };

  const toggleTask = async (task: Task, options?: { status?: "all" | "done" | "undone"; sort?: "priority:asc" | "priority:desc" }) => {
    await api.updateTask(task.id, { completed: !task.completed });
    await loadTasks(options);
  };

  const updateTask = async (task: Task, options?: { status?: "all" | "done" | "undone"; sort?: "priority:asc" | "priority:desc" }) => {
    await api.updateTask(task.id, { title: task.title, priority: task.priority });
    await loadTasks(options);
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return { tasks, loading, loadTasks, addTask, removeTask, toggleTask, updateTask };
}
