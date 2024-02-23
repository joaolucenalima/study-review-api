import { Prisma, type Task, type User } from "@prisma/client";

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserCreateInput): Promise<User>;
}

export interface TasksRepository {
	create(user_id: string, data: Prisma.TaskCreateInput): Promise<Task>;
	findById(id: string): Promise<Task | null>;
	findTodayTasksAndRevisions(
		user_id: string,
		today: string,
	): Promise<Task[] | null>;
	toggleCompleteTask(id: string, completed: boolean): Promise<void>;
	deferTasks(user_id: string, nextDay: Date): Promise<void>;
}

export interface RevisionsRepository {
	create(task_id: string, date: string): Promise<void>;
}
