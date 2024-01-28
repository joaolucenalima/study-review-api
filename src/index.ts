import cookie from "@elysiajs/cookie";
import { Elysia, t } from "elysia";
import { authentication } from "./authentication";
import { profile, registerUser } from "./controllers/user";
import { env } from "./env";

console.log(
	`https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20email%20openid&redirect_uri=${env.REDIRECT_URL}&client_id=${env.CLIENT_ID}&access_type=offline`,
);

const app = new Elysia();

app.use(cookie()).get("/login/callback", registerUser, {
	query: t.Object({
		code: t.String(),
	}),
});

app.use(authentication).get("/me", profile);

app.listen(1337, () => {
	console.log("Elysia server is running on port 1337! 🧄");
});
