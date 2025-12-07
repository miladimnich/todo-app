"use client";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TaskItem({ task, onRemove, onToggle }: TaskItemProps) {
  return (
    <div className="flex justify-between p-2 border-b">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={`text-black ${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.title} (Priority: {task.priority})
        </span>

      </div>
      <button onClick={() => onRemove(task.id)} className="text-red-500">
        Remove
      </button>
    </div>
  );
}
