"use client";

import { useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";

export default function Page() {
  const { tasks, loading, addTask, removeTask, toggleTask } = useTasks();
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

        {/* Task form and search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex-1">
            <TaskForm onTaskAdded={addTask} />
          </div>
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
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList tasks={filteredTasks} onRemove={removeTask} onToggle={toggleTask} />
        )}
      </div>
    </main>
  );
}
