"use client";
import { Task } from "../../types/task";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  onRemove: (id: number) => void;
  onToggle: (task: Task) => void;
}

export default function TaskList({ tasks, onRemove, onToggle }: TaskListProps) {
  if (!tasks.length) return <p>No tasks yet</p>;

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onRemove={onRemove} onToggle={onToggle} />
        </li>
      ))}
    </ul>
  );
}
