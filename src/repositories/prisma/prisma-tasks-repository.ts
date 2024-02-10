import type { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { prisma } from "../../lib/prisma";
import type { TasksRepository } from "../interfaces";

export class PrismaTasksRepository implements TasksRepository {
	async find(id: string) {
		const task = await prisma.tasks.findUnique({
			where: {
				id,
			},
		});

		return task;
	}

	async findTodayTasksAndRevisions(user_id: string) {
		const tasks = await prisma.tasks.findMany({
			where: {
				user_id,
				OR: [
					{
						first_date: format(new Date(), "dd-MM-yyyy"),
						completed: false,
					},
					{
						next_revision_day: format(new Date(), "dd-MM-yyyy"),
						completed: true,
					},
				],
			},
		});

		return tasks;
	}

	async create(user_id: string, data: Prisma.TasksCreateInput) {
		await prisma.tasks.create({
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

	async toggleComplete(id: string, completed: boolean) {
		await prisma.tasks.update({
			where: {
				id,
			},
			data: {
				completed: !completed,
			},
		});
	}

	async deferTasks(user_id: string) {
		const tomorrow = new Date();
		tomorrow.setTime(tomorrow.getTime() + 1000 * 60 * 60 * 24);

		await prisma.tasks.updateMany({
			where: {
				user_id,
				first_date: format(new Date(), "dd-MM-yyyy"),
			},
			data: {
				first_date: format(tomorrow, "dd-MM-yyyy"),
				next_revision_day: format(
					new Date(tomorrow.setTime(tomorrow.getTime() + 1000 * 60 * 60 * 24)),
					"dd-MM-yyyy",
				),
			},
		});
	}

	async deferRevisions(user_id: string) {
		const tomorrow = new Date();
		tomorrow.setTime(tomorrow.getTime() + 1000 * 60 * 60 * 24);

		await prisma.tasks.updateMany({
			where: {
				user_id,
				next_revision_day: format(new Date(), "dd-MM-yyyy"),
				completed: true,
			},
			data: {
				next_revision_day: format(tomorrow, "dd-MM-yyyy"),
			},
		});
	}
}
