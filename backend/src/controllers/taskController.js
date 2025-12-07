import { TaskService } from "../services/taskService.js";

export const TaskController = {
  async getTasks(req, res, next) {
    try {
      const tasks = await TaskService.getAll();
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
