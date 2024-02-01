import { Prisma, type Tasks, type User } from "@prisma/client";

export interface UsersRepository {
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserCreateInput): Promise<User>;
}

export interface TasksRepository {
	findTodayTasksAndRevisions(email: string): Promise<Tasks[] | null>;
	create(data: Prisma.TasksCreateInput, user_id: string): Promise<void>;
}
