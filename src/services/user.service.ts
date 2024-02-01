import { Prisma } from "@prisma/client";
import type { UsersRepository } from "../repositories/interfaces";

export class UserServices {
	constructor(private usersRepository: UsersRepository) {}

	async login(userData: Prisma.UserCreateInput) {
		let user = await this.usersRepository.findByEmail(userData.email);

		if (!user) {
			user = await this.usersRepository.create(userData);
		}

		return user;
	}

	async profile(id: string) {
		return await this.usersRepository.findById(id);
	}
}
