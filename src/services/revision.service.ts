import type { RevisionsRepository } from "../repositories/interfaces";

export class RevisionServices {
	constructor(private revisionRepository: RevisionsRepository) { }

	async create(task_id: string, date: string) {
		await this.revisionRepository.create(task_id, date);
	}

	async findTodayRevisions(user_id: string, today: string) {
		return await this.revisionRepository.findTodayRevisions(user_id, today);
	}

	async complete(task_id: string, user_id: string) {
		const revision = await this.revisionRepository.findById(task_id);

		if (!revision) {
			throw new Error("Revision not found");
		}

		await this.revisionRepository.complete(task_id, user_id);
	}
}
