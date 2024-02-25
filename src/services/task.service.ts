import { formatISO } from "date-fns";
import type { TasksRepository } from "../repositories/interfaces";

interface CreateTask {
	user_id: string;
	body: {
		title: string;
		description: string;
		first_date: string;
	};
}

export class TasksServices {
	constructor(private tasksRepository: TasksRepository) {}

	async create({ user_id, body }: CreateTask) {
		body.first_date = formatISO(body.first_date, { representation: "date" });
		return await this.tasksRepository.create(user_id, body);
	}

	async findTasksAndRevisions(user_id: string) {
		return await this.tasksRepository.findByDate(
			user_id,
			formatISO(new Date()),
		);
	}

	async toggleComplete(id: string) {
		const task = await this.tasksRepository.findById(id);

		if (!task) {
			return { error: "Task not found" };
		}

		if (task.completed) {
			await this.tasksRepository.updateCompleted(task.id, task.completed);
		}
	}

	async deferToday(user_id: string, nextValidDay: string) {
		await this.tasksRepository.updateDay(user_id, nextValidDay);
	}
}
