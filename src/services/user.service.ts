import type { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function getUserInfo(access_token: string) {
	return await fetch(
		`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
	).then(res => res.json() as Promise<User>);
}

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
