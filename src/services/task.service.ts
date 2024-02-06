import type { Prisma } from "@prisma/client";
import type { TasksRepository } from "../repositories/interfaces";

export class TasksServices {
	constructor(private tasksRepository: TasksRepository) {}

	async findTasks(user_id: string) {
		const tasks =
			await this.tasksRepository.findTodayTasksAndRevisions(user_id);

		return tasks;
	}

	async create(user_id: string, body: Prisma.TasksCreateInput) {
		return await this.tasksRepository.create(body, user_id);
	}
}
