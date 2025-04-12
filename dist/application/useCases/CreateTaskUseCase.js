"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
const TaskErrors_1 = require("../../domain/errors/TaskErrors");
class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(task) {
        if (!task.description.trim()) {
            throw new TaskErrors_1.InvalidTaskDescriptionError();
        }
        const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
        if (!validStatuses.includes(task.status)) {
            throw new TaskErrors_1.InvalidTaskStatusError(task.status);
        }
        return await this.taskRepository.create(task);
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
