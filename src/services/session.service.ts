import { prisma } from "../lib/prisma";

interface CreateSessionProps {
	access_token: string;
	id: string;
}

export default async function createSession({
	access_token,
	id,
}: CreateSessionProps) {
	try {
		await prisma.sessions.create({
			data: {
				session_id: access_token,
				session_user: id,
			},
		});
	} catch (err) {
		console.error(err);
	}
}
