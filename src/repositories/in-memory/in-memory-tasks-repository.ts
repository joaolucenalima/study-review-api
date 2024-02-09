import type { Prisma, Tasks } from "@prisma/client";
import { format } from "date-fns";
import type { TasksRepository } from "../interfaces";

export class InMemoryTasksRepository implements TasksRepository {
	public taskList: Tasks[] = [
		{
			id: crypto.randomUUID(),
			user_id: "id-teste",
			first_date: format(new Date(), "dd-MM-yyyy"),
			title: "Task 1",
			completed: false,
			next_revision_day: format(new Date(), "dd-MM-yyyy"),
		},
	];

	async findTodayTasksAndRevisions(user_id: string) {
		const tasks = this.taskList.filter(task => task.user_id === user_id);
		return tasks || null;
	}

	async create(user_id: string, data: Prisma.TasksCreateInput) {
		this.taskList.push({
			id: crypto.randomUUID(),
			user_id,
			completed: data.completed || false,
			...data,
		});
	}
}
