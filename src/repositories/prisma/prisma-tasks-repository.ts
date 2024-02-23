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
				}
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

	async findTodayTasksAndRevisions(user_id: string, today: string) {
		console.log(today);
		const tasks = await prisma.task.findMany({
			where: {
				user_id,
				OR: [
					{
						first_date: {
							lte: today,
						},
						completed: false,
					},
					{
						completed: true,
					},
				],
			},
		});

		return tasks;
	}

	async toggleCompleteTask(id: string, completed: boolean) {
		await prisma.task.update({
			where: {
				id,
			},
			data: {
				completed: !completed,
			},
		});
	}

	async deferTasks(user_id: string, nextDay: Date) {
		await prisma.task.updateMany({
			where: {
				user_id,
				completed: false,
			},
			data: {
				first_date: nextDay,
			},
		});
	}
}
