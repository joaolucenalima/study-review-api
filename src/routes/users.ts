import cookie from "@elysiajs/cookie";
import type { User } from "@prisma/client";
import Elysia, { t } from "elysia";
import { authentication } from "../authentication";
import { env } from "../env";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import createSession from "../services/session.service";
import { UserServices } from "../services/user.service";

export const UsersRoutes = new Elysia();

const usersRepository = new PrismaUsersRepository();
const usersServices = new UserServices(usersRepository);

interface GoogleTokensResult {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	id_token: string;
}

UsersRoutes.use(cookie()).get(
	"/login/callback",
	async ({ query, set, setCookie }) => {
		const paramsValues = new URLSearchParams({
			code: query.code,
			client_id: env.CLIENT_ID,
			client_secret: env.CLIENT_SECRET,
			redirect_uri: env.REDIRECT_URL,
			grant_type: "authorization_code",
		});

		const { access_token } = await fetch(
			`https://oauth2.googleapis.com/token?${paramsValues}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		).then(res => res.json() as Promise<GoogleTokensResult>);

		const userData = await fetch(
			`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
		).then(res => res.json() as Promise<User>);

		const { email } = await usersServices.login(userData);

		await createSession({ access_token, email });

		setCookie("session_id", access_token, {
			httpOnly: true,
			secure: true,
			sameSite: true,
			path: "/",
			maxAge: 60 * 60 * 24 * 60, // 2 meses
		});

		set.redirect = "/";
	},
	{
		query: t.Object({
			code: t.String(),
		}),
	},
);

UsersRoutes.use(authentication).get("/me", async ({ getUserEmail }) => {
	const email = await getUserEmail();

	if (email) {
		const user = await usersServices.profile(email);
		return user;
	}
});