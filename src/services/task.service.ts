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
		await this.tasksRepository.create(user_id, body);
	}

	async toggleCompleted(id: string) {
		const task = await this.tasksRepository.find(id);

		if (!task) {
			return { error: "Task not found" };
		}

		await this.tasksRepository.toggleComplete(task.id, task.completed);
	}

	async deferDay(user_id: string) {
		await this.tasksRepository.deferRevisions(user_id);
		await this.tasksRepository.deferTasks(user_id);
	}
}
