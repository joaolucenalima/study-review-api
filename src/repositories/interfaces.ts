import { Prisma, type Revision, type Task, type User } from "@prisma/client";

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserCreateInput): Promise<User>;
}

export interface TasksRepository {
	create(user_id: string, data: Prisma.TaskCreateInput): Promise<Task>;
	findById(id: string): Promise<Task | null>;
	findTodayTasks(user_id: string, today: string): Promise<Task[] | null>;
	toggleCompleteTask(id: string, completed: boolean): Promise<void>;
	deferTasks(user_id: string, nextDay: Date): Promise<void>;
}

export interface RevisionsRepository {
	create(task_id: string, date: string): Promise<void>;
	findById(id: string): Promise<Revision | null>;
	findTodayRevisions(
		user_id: string,
		today: string,
	): Promise<
		{
			completed: boolean;
			Task: { title: string; description: string; first_date: Date } | null;
		}[]
	>;
	complete(task_id: string, user_id: string): Promise<void>;
}
