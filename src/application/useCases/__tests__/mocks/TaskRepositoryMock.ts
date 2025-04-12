import { Task } from '../../../../domain/entities/Task';
import { ITaskRepository } from '../../../../domain/repositories/ITaskRepository';

export class TaskRepositoryMock implements ITaskRepository {
  private tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    const newTask = {
      ...task,
      id: this.tasks.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: number): Promise<Task | null> {
    const task = this.tasks.find(task => task.id === id);
    return task || null;
  }

  async update(id: number, task: Task): Promise<Task> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    const updatedTask = {
      ...task,
      id,
      updatedAt: new Date(),
    };
    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  async delete(id: number): Promise<void> {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks.splice(index, 1);
  }
} 