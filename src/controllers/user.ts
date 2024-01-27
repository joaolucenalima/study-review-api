import type { CookieRequest } from "@elysiajs/cookie";
import type { User } from "@prisma/client";
import type { Context } from "elysia";
import { env } from "../env";
import createSession from "../services/session.service";
import { findOrCreateUser } from "../services/user.service";

interface GoogleLoginProps {
	query: {
		code: string;
	};
	setCookie: CookieRequest["setCookie"];
	set: Context["set"];
}

interface GoogleTokensResult {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	id_token: string;
}

export async function registerUser({
	query,
	setCookie,
	set,
}: GoogleLoginProps) {
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

	const { name } = await findOrCreateUser(userData);

	await createSession({ access_token, name });

	setCookie("session_id", access_token, {
		httpOnly: true,
		secure: true,
		sameSite: true,
		path: "/",
		maxAge: 60 * 60 * 24 * 60, // 2 meses
	});

	set.redirect = "/";
}
