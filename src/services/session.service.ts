import { prisma } from "../lib/prisma";

interface CreateSessionProps {
	access_token: string;
	id: string;
}

export default async function createSession({
	access_token,
	id,
}: CreateSessionProps) {
	const sessions = await prisma.sessions.findMany({
		where: {
			session_user: id,
		},
	});

	if (sessions) {
		await prisma.sessions.deleteMany({
			where: {
				session_user: id,
			},
		});
	}

	await prisma.sessions.create({
		data: {
			session_id: access_token,
			session_user: id,
		},
	});
}
