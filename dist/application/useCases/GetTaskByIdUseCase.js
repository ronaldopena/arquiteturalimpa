"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTaskByIdUseCase = void 0;
const TaskErrors_1 = require("../../domain/errors/TaskErrors");
class GetTaskByIdUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new TaskErrors_1.TaskNotFoundError(id);
        }
        return task;
    }
}
exports.GetTaskByIdUseCase = GetTaskByIdUseCase;
