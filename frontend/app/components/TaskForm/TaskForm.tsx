"use client";

import { useState } from "react";
import { NewTask } from "../../types/task"; // NewTask interface
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onTaskAdded: (task: NewTask) => void; // <-- expects the task object
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onTaskAdded({ title, priority }); // <-- pass task to parent hook
    setTitle("");
    setPriority(5);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        className={styles.input}
      />

      <div className={styles.priority}>
        <label>Priority:</label>
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          min={1}
          max={10}
          className={styles.priorityInput}
        />
      </div>

      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}
