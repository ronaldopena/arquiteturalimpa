import { Task, TaskStatus } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskNotFoundError, InvalidTaskDescriptionError, InvalidTaskStatusError } from '../../domain/errors/TaskErrors';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number, task: Task): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new TaskNotFoundError(id);
    }

    if (!task.description || !task.description.trim()) {
      throw new InvalidTaskDescriptionError();
    }

    const validStatuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
    if (!task.status || !validStatuses.includes(task.status)) {
      throw new InvalidTaskStatusError(task.status);
    }

    return await this.taskRepository.update(id, task);
  }
} 