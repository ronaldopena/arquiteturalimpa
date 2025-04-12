import { Request, Response } from 'express';
import { CreateTaskUseCase } from '../../application/useCases/CreateTaskUseCase';
import { GetTaskByIdUseCase } from '../../application/useCases/GetTaskByIdUseCase';
import { UpdateTaskUseCase } from '../../application/useCases/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/useCases/DeleteTaskUseCase';
import { PrismaTaskRepository } from '../../infrastructure/repositories/PrismaTaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskNotFoundError, InvalidTaskDescriptionError, InvalidTaskStatusError } from '../../domain/errors/TaskErrors';

export class TaskController {
  private repository: PrismaTaskRepository;

  constructor() {
    this.repository = new PrismaTaskRepository();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createTaskUseCase = new CreateTaskUseCase(this.repository);
      const task = await createTaskUseCase.execute(req.body);
      return res.status(201).json(task);
    } catch (error) {
      if (error instanceof InvalidTaskDescriptionError || error instanceof InvalidTaskStatusError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const getTaskByIdUseCase = new GetTaskByIdUseCase(this.repository);
      const task = await getTaskByIdUseCase.execute(Number(req.params.id));
      return res.json(task);
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await this.repository.findAll();
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateTaskUseCase = new UpdateTaskUseCase(this.repository);
      const task = await updateTaskUseCase.execute(Number(req.params.id), req.body);
      return res.json(task);
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      if (error instanceof InvalidTaskDescriptionError || error instanceof InvalidTaskStatusError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleteTaskUseCase = new DeleteTaskUseCase(this.repository);
      await deleteTaskUseCase.execute(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
} 