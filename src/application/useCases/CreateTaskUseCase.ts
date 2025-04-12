import { Task, TaskStatus } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { InvalidTaskDescriptionError, InvalidTaskStatusError } from '../../domain/errors/TaskErrors';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(task: Task): Promise<Task> {
    if (!task.description.trim()) {
      throw new InvalidTaskDescriptionError();
    }

    const validStatuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
    if (!validStatuses.includes(task.status)) {
      throw new InvalidTaskStatusError(task.status);
    }

    return await this.taskRepository.create(task);
  }
} 