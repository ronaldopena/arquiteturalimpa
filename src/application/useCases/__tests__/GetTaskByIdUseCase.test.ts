import { GetTaskByIdUseCase } from '../GetTaskByIdUseCase';
import { TaskRepositoryMock } from './mocks/TaskRepositoryMock';
import { TaskNotFoundError } from '../../../domain/errors/TaskErrors';

describe('GetTaskByIdUseCase', () => {
  let getTaskByIdUseCase: GetTaskByIdUseCase;
  let taskRepository: TaskRepositoryMock;

  beforeEach(() => {
    taskRepository = new TaskRepositoryMock();
    getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
  });

  it('should get a task by id successfully', async () => {
    // Primeiro, criar uma tarefa
    const taskData = {
      description: 'Test task',
      status: 'PENDING' as const,
    };
    const createdTask = await taskRepository.create(taskData);

    // Buscar a tarefa
    const task = await getTaskByIdUseCase.execute(createdTask.id!);

    expect(task).toBeDefined();
    expect(task?.id).toBe(createdTask.id);
    expect(task?.description).toBe(taskData.description);
    expect(task?.status).toBe(taskData.status);
  });

  it('should throw TaskNotFoundError when task does not exist', async () => {
    await expect(getTaskByIdUseCase.execute(999)).rejects.toThrow(
      TaskNotFoundError
    );
  });
}); 