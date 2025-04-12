import { CreateTaskUseCase } from '../CreateTaskUseCase';
import { TaskRepositoryMock } from './mocks/TaskRepositoryMock';
import { InvalidTaskDescriptionError, InvalidTaskStatusError } from '../../../domain/errors/TaskErrors';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: TaskRepositoryMock;

  beforeEach(() => {
    taskRepository = new TaskRepositoryMock();
    createTaskUseCase = new CreateTaskUseCase(taskRepository);
  });

  it('should create a task successfully', async () => {
    const taskData = {
      description: 'Test task',
      status: 'PENDING' as const,
    };

    const task = await createTaskUseCase.execute(taskData);

    expect(task).toHaveProperty('id');
    expect(task.description).toBe(taskData.description);
    expect(task.status).toBe(taskData.status);
    expect(task).toHaveProperty('createdAt');
    expect(task).toHaveProperty('updatedAt');
  });

  it('should throw InvalidTaskDescriptionError when description is empty', async () => {
    const taskData = {
      description: '',
      status: 'PENDING' as const,
    };

    await expect(createTaskUseCase.execute(taskData)).rejects.toThrow(
      InvalidTaskDescriptionError
    );
  });

  it('should throw InvalidTaskStatusError when status is invalid', async () => {
    const taskData = {
      description: 'Test task',
      status: 'INVALID_STATUS' as any,
    };

    await expect(createTaskUseCase.execute(taskData)).rejects.toThrow(
      InvalidTaskStatusError
    );
  });
}); 