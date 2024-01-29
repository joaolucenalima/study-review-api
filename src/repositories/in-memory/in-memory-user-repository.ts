import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../interfaces";

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email);
		return user || null;
	}

	async create(userData: Prisma.UserCreateInput) {
		const user = {
			id: "n1-923fni2edn230",
			name: userData.name,
			email: userData.email,
			picture: userData.picture,
		};

		this.users.push(user);

		return user;
	}
}
