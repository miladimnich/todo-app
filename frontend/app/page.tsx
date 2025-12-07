"use client";

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";

export default function Page() {
  const { tasks, loading, loadTasks, addTask, removeTask, toggleTask, updateTask } = useTasks();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "done" | "undone">("all");
  const [sort, setSort] = useState<"priority:asc" | "priority:desc">("priority:asc");

  // Reload tasks whenever status or sort changes
  useEffect(() => {
    loadTasks({ status, sort });
  }, [status, sort, loadTasks]);

  // Local search filter
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

        {/* Task form, search, filter, sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex-1">
            <TaskForm onTaskAdded={addTask} />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-b-2 border-gray-400 focus:border-blue-500 outline-none px-2 py-1 w-64 placeholder-gray-400"
            />

            {/* Status filter */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "all" | "done" | "undone")}
              className="border px-2 py-1 rounded"
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="undone">Undone</option>
            </select>

            {/* Priority sort */}
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "priority:asc" | "priority:desc")
              }
              className="border px-2 py-1 rounded"
            >
              <option value="priority:asc">Priority ↑</option>
              <option value="priority:desc">Priority ↓</option>
            </select>
          </div>
        </div>

        {/* Task list */}
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onRemove={removeTask}
            onToggle={toggleTask}
            onUpdate={updateTask} // pass the hook’s updateTask
          />
        )}
      </div>
    </main>
  );
}
