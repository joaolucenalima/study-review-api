import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import type { TasksRepository } from "../interfaces";

export class PrismaTasksRepository implements TasksRepository {
	async findTodayTasksAndRevisions(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		const tasks = await prisma.tasks.findMany({
			where: {
				user_id: user.id,
				first_date: new Date().toISOString(),
			},
			include: {
				revisions: true,
			},
		});

		return tasks;
	}

	async create(data: Prisma.TasksCreateInput, user_id: string) {
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
}
