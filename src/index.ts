import { Elysia } from "elysia";
import { env } from "./env";
import login from "./routes/login";

const app = new Elysia();

console.log(
	`https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20email%20openid&redirect_uri=${env.REDIRECT_URL}&client_id=${env.CLIENT_ID}&access_type=offline`,
);

app.use(login);

app.listen(3000, () => {
	console.log("Elysia server is running on port 3000! 🧄");
});
