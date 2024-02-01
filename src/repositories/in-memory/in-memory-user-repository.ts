import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../interfaces";

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	async findById(id: string) {
		const user = this.users.find(user => user.id === id);
		return user || null;
	}

	async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email);
		return user || null;
	}

	async create(userData: Prisma.UserCreateInput) {
		const user = {
			id: crypto.randomUUID(),
			name: userData.name,
			email: userData.email,
			picture: userData.picture,
		};

		this.users.push(user);

		return user;
	}
}