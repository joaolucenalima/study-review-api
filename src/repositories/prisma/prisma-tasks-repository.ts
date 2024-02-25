import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import type { TasksRepository } from "../interfaces";

export class PrismaTasksRepository implements TasksRepository {
	async create(user_id: string, data: Prisma.TaskCreateInput) {
		return await prisma.task.create({
			data: {
				...data,
				User: {
					connect: {
						id: user_id,
					},
				},
			},
		});
	}

	async findById(id: string) {
		const task = await prisma.task.findUnique({
			where: {
				id,
			},
		});

		return task;
	}

	async findByDate(user_id: string, today: string) {
		const tasks = await prisma.task.findMany({
			where: {
				user_id,
				first_date: {
					lte: today,
				},
				completed: false,
			},
		});

		return tasks;
	}

	async updateCompleted(id: string, completed: boolean) {
		await prisma.task.update({
			where: {
				id,
			},
			data: {
				completed: !completed,
			},
		});
	}

	async updateDay(user_id: string, nextValidDay: string) {
		await prisma.task.updateMany({
			where: {
				user_id,
				completed: false,
			},
			data: {
				first_date: nextValidDay,
			},
		});
	}
}
