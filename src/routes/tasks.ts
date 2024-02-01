import Elysia from "elysia";
import { authentication } from "../authentication";
import { PrismaTasksRepository } from "../repositories/prisma/prisma-tasks-repository";
import { TasksServices } from "../services/task.service";

export const TasksRoutes = new Elysia();

const taskRepository = new PrismaTasksRepository();
const tasksServices = new TasksServices(taskRepository);

TasksRoutes.use(authentication).get("/tasks", async ({ getLoggedUserId }) => {
	const user_id = (await getLoggedUserId()) as string;

	return await tasksServices.findTasks(user_id);
});

TasksRoutes.use(authentication).post("/tasks", async ({ getLoggedUserId }) => {
	const user_id = await getLoggedUserId();
});
