import type { Prisma } from "@prisma/client";
import { format, startOfYesterday } from "date-fns";
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
				first_date: format(new Date(), "dd-MM-yyyy"),
			},
			include: {
				revisions: {
					where: {
						day: format(new Date(), "dd-MM-yyyy"),
						AND: {
							day: format(startOfYesterday(), "dd-MM-yyyy"),
							revised: false,
						},
					},
				},
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
}
