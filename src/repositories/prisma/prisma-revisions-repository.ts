import { prisma } from "../../lib/prisma";

export class PrismaRevisionsRepository {
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
}
