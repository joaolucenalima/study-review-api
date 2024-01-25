import cookie from "@elysiajs/cookie";
import type { User } from "@prisma/client";
import Elysia, { t } from "elysia";
import { env } from "../env";
import { prisma } from "../lib/prisma";

interface GoogleTokensResult {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	id_token: string;
}

const login = new Elysia().use(cookie);

login.get(
	"/login/callback",
	async ({ query: { code }, setCookie, set }) => {
		const tokenURL = "https://oauth2.googleapis.com/token?";
		const valueParams = new URLSearchParams({
			code,
			client_id: env.CLIENT_ID,
			client_secret: env.CLIENT_SECRET,
			redirect_uri: env.REDIRECT_URL,
			grant_type: "authorization_code",
		});

		try {
			const tokenResult = (await fetch(tokenURL + valueParams, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}).then(res => res.json())) as GoogleTokensResult;

			const userData = (await fetch(
				`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResult.access_token}`,
				{
					headers: {
						Authorization: `Bearer ${tokenResult.id_token}`,
					},
				},
			).then(res => res.json())) as User;

			let user = await prisma.user.findUnique({
				where: {
					email: userData.email,
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

			setCookie("access_token", tokenResult.access_token, {
				sameSite: "lax",
				secure: true,
				maxAge: tokenResult.expires_in,
			});

			setCookie("refresh_token", tokenResult.refresh_token, {
				maxAge: 60 * 60 * 24 * 60, // 2 months
			});

			set.redirect = "/";
		} catch (error) {
			console.error(error);
		}
	},
	{
		query: t.Object({
			code: t.String(),
		}),
	},
);

export default login;
