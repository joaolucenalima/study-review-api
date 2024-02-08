import Elysia from "elysia";
import { prisma } from "./lib/prisma";

export const authentication = new Elysia().derive(({ cookie, set }) => {
	return {
		getLoggedUserId: async () => {
			const session_id = cookie.session_id;

			if (!session_id.value) {
				set.status = "Unauthorized";
				set.redirect = "/";
			}

			const session = await prisma.sessions.findUnique({
				where: { session_id: session_id.value },
			});

			if (session) {
				return session.session_user;
			}
			session_id.remove();
			set.status = "Bad Request";
			set.redirect = "/";
		},
	};
});
