import Elysia, { t } from "elysia";
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

TasksRoutes.use(authentication).post(
	"/tasks",
	async ({ getLoggedUserId, body, set }) => {
		const user_id = (await getLoggedUserId()) as string;

		const task = await tasksServices.create(user_id, body);

		if (task) {
			set.status = 201;
			return { message: "Task created successfully" };
		}
	},
	{
		body: t.Object({
			title: t.String(),
			first_date: t.String(),
			next_revision_day: t.String(),
		}),
	},
);
