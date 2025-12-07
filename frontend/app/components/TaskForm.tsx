"use client";

import { useState } from "react";
import { addTask } from "../services/api";

interface TaskFormProps {
  onTaskAdded: () => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(5); // default priority

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await addTask({ title, priority });
    setTitle("");
    setPriority(5);
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      {/* Task title input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        className="border rounded px-2 py-1 flex-1 text-black placeholder-gray-400"
      />

      {/* Priority input with inline label */}
      <div className="flex items-center gap-1">
        <span className="text-gray-600 text-sm">Priority:</span>
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          min={1}
          max={10}
          className="w-16 border rounded px-2 py-1 text-black text-center"
        />
      </div>

      {/* Add button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Add
      </button>
    </form>
  );
}
