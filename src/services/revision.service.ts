import type { RevisionsRepository } from "../repositories/interfaces";

export class RevisionServices {
	constructor(private revisionRepository: RevisionsRepository) { }

	async create(task_id: string, date: string) {
		await this.revisionRepository.create(task_id, date);
	}
}
