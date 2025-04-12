import { DeleteTaskUseCase } from '../DeleteTaskUseCase';
import { TaskRepositoryMock } from './mocks/TaskRepositoryMock';
import { TaskNotFoundError } from '../../../domain/errors/TaskErrors';

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepository: TaskRepositoryMock;

  beforeEach(() => {
    taskRepository = new TaskRepositoryMock();
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  it('should delete a task successfully', async () => {
    // Primeiro, criar uma tarefa
    const taskData = {
      description: 'Test task',
      status: 'PENDING' as const,
    };
    const createdTask = await taskRepository.create(taskData);

    // Deletar a tarefa
    await expect(deleteTaskUseCase.execute(createdTask.id!)).resolves.not.toThrow();

    // Verificar se a tarefa foi deletada
    const tasks = await taskRepository.findAll();
    expect(tasks).toHaveLength(0);
  });

  it('should throw TaskNotFoundError when task does not exist', async () => {
    await expect(deleteTaskUseCase.execute(999)).rejects.toThrow(
      TaskNotFoundError
    );
  });
}); 