export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id?: number;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
} 