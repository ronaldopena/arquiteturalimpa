"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskUseCase = void 0;
const TaskErrors_1 = require("../../domain/errors/TaskErrors");
class DeleteTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new TaskErrors_1.TaskNotFoundError(id);
        }
        await this.taskRepository.delete(id);
    }
}
exports.DeleteTaskUseCase = DeleteTaskUseCase;
