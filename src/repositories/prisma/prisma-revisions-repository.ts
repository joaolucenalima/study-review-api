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

	async findTodayRevisions(user_id: string, today: string) {
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
}
