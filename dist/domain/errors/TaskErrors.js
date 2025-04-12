"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTaskDescriptionError = exports.InvalidTaskStatusError = exports.TaskNotFoundError = void 0;
class TaskNotFoundError extends Error {
    constructor(id) {
        super(`Task with id ${id} not found`);
        this.name = 'TaskNotFoundError';
    }
}
exports.TaskNotFoundError = TaskNotFoundError;
class InvalidTaskStatusError extends Error {
    constructor(status) {
        super(`Invalid task status: ${status}`);
        this.name = 'InvalidTaskStatusError';
    }
}
exports.InvalidTaskStatusError = InvalidTaskStatusError;
class InvalidTaskDescriptionError extends Error {
    constructor() {
        super('Task description cannot be empty');
        this.name = 'InvalidTaskDescriptionError';
    }
}
exports.InvalidTaskDescriptionError = InvalidTaskDescriptionError;
