import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/interfaces";

export class UserServices {
	constructor(private usersRepository: UsersRepository) {}

	async login(userData: User) {
		let user = await this.usersRepository.findByEmail(userData.email);

		if (!user) {
			user = await this.usersRepository.create(userData);
		}

		return user;
	}

	async profile(email: string) {
		return await this.usersRepository.findByEmail(email);
	}
}
