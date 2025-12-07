"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
 
import { fetchTasks, removeTask } from "./services/api";
import { Task } from "./types/task";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleRemove = async (id: number) => {
    await removeTask(id);
    loadTasks();
  };

  const handleToggle = async (task: Task) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    loadTasks();
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

        {/* Task form and search on same line */}
        <div className="flex justify-between items-center mb-4 gap-4">
          {/* New task form */}
          <div className="flex-1">
            <TaskForm onTaskAdded={loadTasks} />
          </div>

          {/* Search input */}
          <div className="flex-shrink-0">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-b-2 border-gray-400 focus:border-blue-500 outline-none px-2 py-1 w-64 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Task list */}
        <TaskList tasks={filteredTasks} onRemove={handleRemove} onToggle={handleToggle} />
      </div>
    </main>
  );
}
