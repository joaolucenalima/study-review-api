import type { RevisionsRepository } from "../repositories/interfaces";

export class RevisionServices {
	constructor(private revisionRepository: RevisionsRepository) { }

	async create(task_id: string, date: string) {
		await this.revisionRepository.create(task_id, date);
	}

	async findTodayRevisions(user_id: string, today: string) {
		return await this.revisionRepository.findTodayRevisions(user_id, today);
	}
}
