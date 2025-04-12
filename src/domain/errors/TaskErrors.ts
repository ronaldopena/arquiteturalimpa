export class TaskNotFoundError extends Error {
  constructor(id: number) {
    super(`Task with id ${id} not found`);
    this.name = 'TaskNotFoundError';
  }
}

export class InvalidTaskStatusError extends Error {
  constructor(status: string) {
    super(`Invalid task status: ${status}`);
    this.name = 'InvalidTaskStatusError';
  }
}

export class InvalidTaskDescriptionError extends Error {
  constructor() {
    super('Task description cannot be empty');
    this.name = 'InvalidTaskDescriptionError';
  }
} 