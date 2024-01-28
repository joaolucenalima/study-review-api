import { prisma } from "../lib/prisma";

interface CreateSessionProps {
	access_token: string;
	email: string;
}

export default async function createSession({
	access_token,
	email,
}: CreateSessionProps) {
	try {
		await prisma.sessions.create({
			data: {
				session_id: access_token,
				session_user: email,
			},
		});
	} catch (err) {
		console.error(err);
	}
}
