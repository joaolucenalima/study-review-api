import Elysia from "elysia";
import { prisma } from "./lib/prisma";

export const authentication = new Elysia().derive(({ cookie, set }) => {
	return {
		getUserEmail: async () => {
			const session_id = cookie.session_id;

			if (!session_id) {
				// biome-ignore lint: elysia 'set' default return format
				return (set.redirect = "/"), (set.status = "Unauthorized");
			}

			const session = await prisma.sessions.findUnique({
				where: { session_id: String(session_id) },
			});

			if (session) {
				return session.session_user;
			}
		},
	};
});
