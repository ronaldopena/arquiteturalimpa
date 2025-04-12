import { PrismaClient } from '@prisma/client';
import { Task, TaskStatus } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class PrismaTaskRepository implements ITaskRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private mapToTask(data: any): Task {
    return {
      id: data.id,
      description: data.description,
      status: data.status as TaskStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async create(task: Task): Promise<Task> {
    const created = await this.prisma.task.create({
      data: {
        description: task.description,
        status: task.status,
      },
    });
    return this.mapToTask(created);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks.map(task => this.mapToTask(task));
  }

  async findById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    return task ? this.mapToTask(task) : null;
  }

  async update(id: number, task: Task): Promise<Task> {
    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        description: task.description,
        status: task.status,
      },
    });
    return this.mapToTask(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
} 