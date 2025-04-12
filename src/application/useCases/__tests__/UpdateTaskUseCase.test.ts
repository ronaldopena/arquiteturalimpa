import { UpdateTaskUseCase } from '../UpdateTaskUseCase';
import { TaskRepositoryMock } from './mocks/TaskRepositoryMock';
import { TaskNotFoundError, InvalidTaskDescriptionError, InvalidTaskStatusError } from '../../../domain/errors/TaskErrors';

describe('UpdateTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;
  let taskRepository: TaskRepositoryMock;

  beforeEach(() => {
    taskRepository = new TaskRepositoryMock();
    updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  });

  it('should update a task successfully', async () => {
    // Primeiro, criar uma tarefa
    const taskData = {
      description: 'Test task',
      status: 'PENDING' as const,
    };
    const createdTask = await taskRepository.create(taskData);

    // Atualizar a tarefa
    const updateData = {
      description: 'Updated task',
      status: 'IN_PROGRESS' as const,
    };

    const updatedTask = await updateTaskUseCase.execute(createdTask.id!, updateData);

    expect(updatedTask.id).toBe(createdTask.id);
    expect(updatedTask.description).toBe(updateData.description);
    expect(updatedTask.status).toBe(updateData.status);
    expect(updatedTask).toHaveProperty('updatedAt');
  });

  it('should throw TaskNotFoundError when task does not exist', async () => {
    const updateData = {
      description: 'Updated task',
      status: 'IN_PROGRESS' as const,
    };

    await expect(updateTaskUseCase.execute(999, updateData)).rejects.toThrow(
      TaskNotFoundError
    );
  });

  it('should throw InvalidTaskDescriptionError when description is empty', async () => {
    // Primeiro, criar uma tarefa
    const taskData = {
      description: 'Test task',
      status: 'PENDING' as const,
    };
    const createdTask = await taskRepository.create(taskData);

    // Tentar atualizar com descrição vazia
    const updateData = {
      description: '',
      status: 'IN_PROGRESS' as const,
    };

    await expect(updateTaskUseCase.execute(createdTask.id!, updateData)).rejects.toThrow(
      InvalidTaskDescriptionError
    );
  });

  it('should throw InvalidTaskStatusError when status is invalid', async () => {
    // Primeiro, criar uma tarefa
    const taskData = {
      description: 'Test task',
      status: 'PENDING' as const,
    };
    const createdTask = await taskRepository.create(taskData);

    // Tentar atualizar com status inválido
    const updateData = {
      description: 'Updated task',
      status: 'INVALID_STATUS' as any,
    };

    await expect(updateTaskUseCase.execute(createdTask.id!, updateData)).rejects.toThrow(
      InvalidTaskStatusError
    );
  });
}); 