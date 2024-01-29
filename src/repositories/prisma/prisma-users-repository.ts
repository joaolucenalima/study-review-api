import type { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import type { UsersRepository } from "../interfaces";

export class PrismaUsersRepository implements UsersRepository {
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		return user;
	}

	async create(userData: User) {
		const user = await prisma.user.create({
			data: {
				email: userData.email,
				name: userData.name,
				picture: userData.picture,
			},
		});

		return user;
	}
}
