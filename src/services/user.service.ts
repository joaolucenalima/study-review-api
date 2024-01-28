import type { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function findOrCreateUser(userData: User) {
	let user = await prisma.user.findUnique({
		where: {
			email: userData.email,
			name: userData.name,
		},
	});

	if (!user) {
		user = await prisma.user.create({
			data: {
				email: userData.email,
				name: userData.name,
				picture: userData.picture,
			},
		});
	}

	return user;
}
