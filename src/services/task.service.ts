import { addDays, formatISO } from "date-fns";
import type { TasksRepository } from "../repositories/interfaces";

interface CreateTask {
	user_id: string;
	body: {
		title: string;
		description: string;
		first_date: string;
	}
}

export class TasksServices {
	constructor(private tasksRepository: TasksRepository) { }

	async create({ user_id, body }: CreateTask) {
		body.first_date = formatISO(body.first_date);
		return await this.tasksRepository.create(user_id, body);
	}

	async findTasks(user_id: string) {
		const tasks = await this.tasksRepository.findTodayTasksAndRevisions(
			user_id,
			formatISO(new Date().toLocaleDateString()),
		);

		return tasks;
	}

	async toggleCompleted(id: string) {
		const task = await this.tasksRepository.findById(id);

		if (!task) {
			return { error: "Task not found" };
		}

		if (task.completed) {
			await this.tasksRepository.toggleCompleteTask(task.id, task.completed);
		}
	}

	async deferDay(user_id: string, dayToDefer: Date) {
		await this.tasksRepository.deferTasks(user_id, addDays(dayToDefer, 1));
	}
}
