import type { TasksRepository } from "../repositories/interfaces";

export class TasksServices {
	constructor(private tasksRepository: TasksRepository) {}

	async findTasks(email: string) {
		const tasks = await this.tasksRepository.findTodayTasksAndRevisions(email);

		return tasks;
	}
}
