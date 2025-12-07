// ES Module compatible import
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });



 

export const TaskService = {
  getAll() {
    return prisma.task.findMany();
  },

  create(data) {
    return prisma.task.create({ data });
  },

  update(id, data) {
    return prisma.task.update({
      where: { id: Number(id) },
      data,
    });
  },

  delete(id) {
    return prisma.task.delete({
      where: { id: Number(id) },
    });
  },
};
