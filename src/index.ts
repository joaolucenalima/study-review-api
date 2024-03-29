import Elysia from "elysia";
import { TasksRoutes } from "./routes/tasks";
import { UsersRoutes } from "./routes/users";

// console.log(
// 	`https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20email%20openid&redirect_uri=${env.REDIRECT_URL}&client_id=${env.CLIENT_ID}&access_type=offline`,
// );

const app = new Elysia().use(UsersRoutes).use(TasksRoutes);

app.listen(1337, () => {
	console.log("Elysia server is running on port 1337! 🧄");
});

export { app };
