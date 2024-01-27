import { prisma } from "../lib/prisma";

interface CreateSessionProps {
	access_token: string;
	name: string;
}

export default async function createSession({
	access_token,
	name,
}: CreateSessionProps) {
	try {
		await prisma.sessions.create({
			data: {
				session_id: access_token,
				session_user: name,
			},
		});
	} catch (err) {
		console.error(err);
	}
}
