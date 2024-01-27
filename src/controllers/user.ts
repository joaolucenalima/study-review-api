import type { CookieRequest } from "@elysiajs/cookie";
import type { Context } from "elysia";
import { env } from "../env";
import { findOrCreateUser, getUserInfo } from "../services/user.service";

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

export async function makeLoginWithGoogle({
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

	const { access_token, expires_in, refresh_token } = await fetch(
		`https://oauth2.googleapis.com/token?${paramsValues}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		},
	).then(res => res.json() as Promise<GoogleTokensResult>);

	const userData = await getUserInfo(access_token);

	await findOrCreateUser(userData);

	setCookie("access_token", access_token, {
		maxAge: expires_in,
		httpOnly: true,
		path: '/'
	});

	setCookie("refresh_token", refresh_token, {
		maxAge: 60 * 60 * 24 * 60, // 2 months
		path: '/'
	});

	set.redirect = "/";
}
