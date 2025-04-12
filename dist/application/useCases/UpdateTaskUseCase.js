"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskUseCase = void 0;
const TaskErrors_1 = require("../../domain/errors/TaskErrors");
class UpdateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id, task) {
        const existingTask = await this.taskRepository.findById(id);
        if (!existingTask) {
            throw new TaskErrors_1.TaskNotFoundError(id);
        }
        if (!task.description.trim()) {
            throw new TaskErrors_1.InvalidTaskDescriptionError();
        }
        const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
        if (!validStatuses.includes(task.status)) {
            throw new TaskErrors_1.InvalidTaskStatusError(task.status);
        }
        return await this.taskRepository.update(id, task);
    }
}
exports.UpdateTaskUseCase = UpdateTaskUseCase;
