import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskNotFoundError } from '../../domain/errors/TaskErrors';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new TaskNotFoundError(id);
    }
    await this.taskRepository.delete(id);
  }
} 