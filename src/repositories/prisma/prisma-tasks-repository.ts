import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import type { TasksRepository } from "../interfaces";

export class PrismaTasksRepository implements TasksRepository {
	async findTodayTasksAndRevisions(user_id: string) {
		const tasks = await prisma.tasks.findMany({
			where: {
				user_id,
				first_date: new Date().toISOString(),
			},
			include: {
				revisions: true,
			},
		});

		return tasks;
	}

	async create(data: Prisma.TasksCreateInput, user_id: string) {
		return await prisma.tasks.create({
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
}
