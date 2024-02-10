import { Prisma, type Tasks, type User } from "@prisma/client";

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserCreateInput): Promise<User>;
}

export interface TasksRepository {
	find(id: string): Promise<Tasks | null>;
	findTodayTasksAndRevisions(user_id: string): Promise<Tasks[] | null>;
	create(user_id: string, data: Prisma.TasksCreateInput): Promise<void>;
	toggleComplete(id: string, completed: boolean): Promise<void>;
	deferTasks(user_id: string): Promise<void>;
	deferRevisions(user_id: string): Promise<void>;
}
