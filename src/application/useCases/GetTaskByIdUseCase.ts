import { Task } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskNotFoundError } from '../../domain/errors/TaskErrors';

export class GetTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new TaskNotFoundError(id);
    }
    return task;
  }
} 