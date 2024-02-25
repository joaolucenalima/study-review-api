import { formatISO } from "date-fns";
import { prisma } from "../../lib/prisma";
import type { RevisionsRepository } from "../interfaces";

export class PrismaRevisionsRepository implements RevisionsRepository {
	async create(task_id: string, date: string) {
		await prisma.revision.create({
			data: {
				day: date,
				Task: {
					connect: {
						id: task_id,
					},
				},
			},
		});
	}

	async findById(id: string) {
		const revision = await prisma.revision.findUnique({
			where: {
				id,
			},
		});

		return revision;
	}

	async findByDay(user_id: string, today: string) {
		const revisions = await prisma.revision.findMany({
			where: {
				Task: {
					user_id,
				},
				day: today,
				completed: false,
			},
			select: {
				completed: true,
				Task: {
					select: {
						title: true,
						description: true,
						first_date: true,
					},
				},
			},
		});

		return revisions;
	}

	async complete(task_id: string, user_id: string) {
		await prisma.revision.update({
			where: {
				id: task_id,
				Task: {
					user_id,
				},
			},
			data: {
				completed: true,
			},
		});
	}

	async updateDay(user_id: string, nextValidDay: string) {
		await prisma.revision.updateMany({
			where: {
				Task: {
					user_id,
				},
				day: formatISO(new Date().toLocaleDateString()),
			},
			data: {
				day: nextValidDay,
			},
		});
	}
}
