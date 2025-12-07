import { TaskService } from "../services/taskService.js";

export const TaskController = {
  async getTasks(req, res, next) {
    try {
      let tasks = await TaskService.getAll();

      // Filter by status
      const { status, sort } = req.query;
      if (status === "done") {
        tasks = tasks.filter(task => task.completed);
      } else if (status === "undone") {
        tasks = tasks.filter(task => !task.completed);
      }

      // Sort by priority
      if (sort === "priority:asc") {
        tasks = tasks.sort((a, b) => a.priority - b.priority);
      } else if (sort === "priority:desc") {
        tasks = tasks.sort((a, b) => b.priority - a.priority);
      }

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
  async createTask(req, res, next) {
    try {
      const { title, priority = 5 } = req.body;
      const task = await TaskService.create({
        title,
        priority,
        completed: false,
      });
      res.json(task);
    } catch (error) { next(error); }
  },

  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await TaskService.update(id, req.body);
      res.json(task);
    } catch (error) { next(error); }
  },

  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await TaskService.delete(id);
      res.json(task);
    } catch (error) { next(error); }
  },
};
