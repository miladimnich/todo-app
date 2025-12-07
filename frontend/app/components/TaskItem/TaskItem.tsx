"use client";
import { Task } from "../../types/task";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (task: Task) => void;
}

export default function TaskItem({ task, onRemove, onToggle }: TaskItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        <span className={task.completed ? styles.completed : ""}>
          {task.title} (Priority: {task.priority})
        </span>
      </div>
      <button onClick={() => onRemove(task.id)} className={styles.remove}>
        Remove
      </button>
    </div>
  );
}
