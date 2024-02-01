import type { Prisma, Tasks, User } from "@prisma/client";
import type { TasksRepository } from "../interfaces";

export class InMemoryTasksRepository implements TasksRepository {
	public taskList: Tasks[] = [
		{
			id: crypto.randomUUID(),
			user_id: "n1-923fni2edn230",
			first_date: new Date().toISOString(),
			title: "Task 1",
			completed: false,
			next_revision_day: new Date().toISOString(),
		},
	];

	public users: User[] = [
		{
			id: "n1-923fni2edn230",
			name: "John Doe",
			email: "johndoe@example.com",
			picture: "https://example.com/johndoe.jpg",
		},
	];

	async findTodayTasksAndRevisions(email: string) {
		const user = this.users.find(user => user.email === email);

		if (!user) {
			return null;
		}

		this.taskList.map(task => {
			if (
				task.user_id === user.id &&
				task.first_date === new Date().toISOString()
			) {
				this.taskList.push(task);
			}
		});

		return this.taskList || null;
	}

	async create(data: Prisma.TasksCreateInput, user_id: string) {
		this.taskList.push({
			id: crypto.randomUUID(),
			user_id,
			...data,
		});
	}
}
