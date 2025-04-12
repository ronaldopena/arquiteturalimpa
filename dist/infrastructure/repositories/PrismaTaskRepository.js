"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTaskRepository = void 0;
const client_1 = require("@prisma/client");
class PrismaTaskRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    mapToTask(data) {
        return {
            id: data.id,
            description: data.description,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
    async create(task) {
        const created = await this.prisma.task.create({
            data: {
                description: task.description,
                status: task.status,
            },
        });
        return this.mapToTask(created);
    }
    async findAll() {
        const tasks = await this.prisma.task.findMany();
        return tasks.map(task => this.mapToTask(task));
    }
    async findById(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });
        return task ? this.mapToTask(task) : null;
    }
    async update(id, task) {
        const updated = await this.prisma.task.update({
            where: { id },
            data: {
                description: task.description,
                status: task.status,
            },
        });
        return this.mapToTask(updated);
    }
    async delete(id) {
        await this.prisma.task.delete({
            where: { id },
        });
    }
}
exports.PrismaTaskRepository = PrismaTaskRepository;
