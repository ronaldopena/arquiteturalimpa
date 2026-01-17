"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const CreateTaskUseCase_1 = require("../../application/useCases/task/CreateTaskUseCase");
const GetTaskByIdUseCase_1 = require("../../application/useCases/task/GetTaskByIdUseCase");
const UpdateTaskUseCase_1 = require("../../application/useCases/task/UpdateTaskUseCase");
const DeleteTaskUseCase_1 = require("../../application/useCases/task/DeleteTaskUseCase");
const PrismaTaskRepository_1 = require("../../infrastructure/repositories/PrismaTaskRepository");
const TaskErrors_1 = require("../../domain/errors/TaskErrors");
class TaskController {
    constructor() {
        this.repository = new PrismaTaskRepository_1.PrismaTaskRepository();
    }
    async create(req, res) {
        try {
            const createTaskUseCase = new CreateTaskUseCase_1.CreateTaskUseCase(this.repository);
            const task = await createTaskUseCase.execute(req.body);
            return res.status(201).json(task);
        }
        catch (error) {
            if (error instanceof TaskErrors_1.InvalidTaskDescriptionError || error instanceof TaskErrors_1.InvalidTaskStatusError) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async findById(req, res) {
        try {
            const getTaskByIdUseCase = new GetTaskByIdUseCase_1.GetTaskByIdUseCase(this.repository);
            const task = await getTaskByIdUseCase.execute(Number(req.params.id));
            return res.json(task);
        }
        catch (error) {
            if (error instanceof TaskErrors_1.TaskNotFoundError) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async findAll(req, res) {
        try {
            const tasks = await this.repository.findAll();
            return res.json(tasks);
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async update(req, res) {
        try {
            const updateTaskUseCase = new UpdateTaskUseCase_1.UpdateTaskUseCase(this.repository);
            const task = await updateTaskUseCase.execute(Number(req.params.id), req.body);
            return res.json(task);
        }
        catch (error) {
            if (error instanceof TaskErrors_1.TaskNotFoundError) {
                return res.status(404).json({ error: error.message });
            }
            if (error instanceof TaskErrors_1.InvalidTaskDescriptionError || error instanceof TaskErrors_1.InvalidTaskStatusError) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async delete(req, res) {
        try {
            const deleteTaskUseCase = new DeleteTaskUseCase_1.DeleteTaskUseCase(this.repository);
            await deleteTaskUseCase.execute(Number(req.params.id));
            return res.status(204).send();
        }
        catch (error) {
            if (error instanceof TaskErrors_1.TaskNotFoundError) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.TaskController = TaskController;
