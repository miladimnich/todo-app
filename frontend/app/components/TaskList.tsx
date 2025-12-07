"use client";

import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onRemove: (id: number) => void;
  onToggle: (task: Task) => void;
}

export default function TaskList({ tasks, onRemove, onToggle }: TaskListProps) {
  if (tasks.length === 0) return <p>No tasks yet</p>;

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center p-2 bg-white rounded shadow"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
            />
            <span className={task.completed ? "line-through text-gray-400" : ""}>
              {task.title} (Priority: {task.priority})
            </span>
          </div>
          <button
            onClick={() => onRemove(task.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
