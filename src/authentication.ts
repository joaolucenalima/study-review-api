import Elysia from "elysia";
import { prisma } from "./lib/prisma";

export const authentication = new Elysia().derive(({ cookie, set }) => {
	return {
		getLoggedUserId: async () => {
			console.log("cookie", cookie);
			const session_id = cookie.session_id;

			if (!session_id) {
				set.status = "Unauthorized";
				set.redirect = "/";
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
