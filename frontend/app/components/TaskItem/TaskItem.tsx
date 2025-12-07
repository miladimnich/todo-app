"use client";

import { useState } from "react";
import { Task } from "../../types/task";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (task: Task) => void;
  onUpdate: (task: Task) => void; // new prop for updating
}

export default function TaskItem({ task, onRemove, onToggle, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    onUpdate({ ...task, title, priority });
    setIsEditing(false);
  };

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />

        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-1 ml-2"
            />
            <input
              type="number"
              value={priority}
              min={1}
              max={10}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="border px-1 ml-2 w-16"
            />
          </>
        ) : (
          <span className={task.completed ? styles.completed : ""}>
            {task.title} (Priority: {task.priority})
          </span>
        )}
      </div>

      <div className={styles.right}>
        {isEditing ? (
          <button onClick={handleSave} className="text-green-500 ml-2">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-500 ml-2">
            Edit
          </button>
        )}
        <button onClick={() => onRemove(task.id)} className="text-red-500 ml-2">
          Remove
        </button>
      </div>
    </div>
  );
}
