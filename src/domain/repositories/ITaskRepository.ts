import { Task } from '../entities/Task';

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  update(id: number, task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
} 