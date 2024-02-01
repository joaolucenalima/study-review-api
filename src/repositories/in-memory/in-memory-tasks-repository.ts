import type { Prisma, Tasks } from "@prisma/client";
import type { TasksRepository } from "../interfaces";

export class InMemoryTasksRepository implements TasksRepository {
	public taskList: Tasks[] = [
		{
			id: crypto.randomUUID(),
			user_id: "id-teste",
			first_date: new Date().toISOString(),
			title: "Task 1",
			completed: false,
			next_revision_day: new Date().toISOString(),
		},
	];

	async findTodayTasksAndRevisions(user_id: string) {
		const tasks = this.taskList.filter(task => task.user_id === user_id);
		return tasks || null;
	}

	async create(data: Prisma.TasksCreateInput, user_id: string) {
		this.taskList.push({
			id: crypto.randomUUID(),
			user_id,
			...data,
		});
	}
}
