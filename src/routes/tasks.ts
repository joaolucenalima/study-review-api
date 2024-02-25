import { addDays, formatISO } from "date-fns";
import Elysia, { t } from "elysia";
import { authentication } from "../authentication";
import { PrismaRevisionsRepository } from "../repositories/prisma/prisma-revisions-repository";
import { PrismaTasksRepository } from "../repositories/prisma/prisma-tasks-repository";
import { RevisionServices } from "../services/revision.service";
import { TasksServices } from "../services/task.service";

export const TasksRoutes = new Elysia();

const taskRepository = new PrismaTasksRepository();
const tasksServices = new TasksServices(taskRepository);

const revisionsRepository = new PrismaRevisionsRepository();
const revisionServices = new RevisionServices(revisionsRepository);

TasksRoutes.use(authentication).post(
	"/task",
	async ({ getLoggedUserId, body, set }) => {
		const user_id = (await getLoggedUserId()) as string;

		try {
			const task = await tasksServices.create({ user_id, body });

			const nextDay = formatISO(addDays(body.first_date, 1), {
				representation: "date",
			});
			await revisionServices.create(task.id, nextDay);

			set.status = 201;
			return { message: "Task created successfully" };
		} catch (error) {
			set.status = 400;
			return { error };
		}
	},
	{
		body: t.Object({
			title: t.String(),
			description: t.String(),
			first_date: t.String({ format: "date-time" }),
		}),
	},
);

TasksRoutes.use(authentication).get("/tasks", async ({ getLoggedUserId }) => {
	const user_id = (await getLoggedUserId()) as string;

	const tasks = await tasksServices.findTasksAndRevisions(user_id);
	const revisions = await revisionServices.findTodayRevisions(
		user_id,
		formatISO(new Date().toLocaleDateString()),
	);

	return { tasks, revisions };
});

TasksRoutes.use(authentication).patch(
	"/task/:id",
	async ({ getLoggedUserId, params, set }) => {
		await getLoggedUserId();

		try {
			await tasksServices.toggleCompleted(params.id);

			set.status = 200;
			return { message: "Estudo completo!" };
		} catch (error) {
			set.status = 500;
			return { error };
		}
	},
	{
		params: t.Object({
			id: t.String(),
		}),
	},
);

TasksRoutes.use(authentication).patch(
	"/revision/:id",
	async ({ getLoggedUserId, params, set }) => {
		const user_id = (await getLoggedUserId()) as string;

		try {
			await revisionServices.complete(params.id, user_id);

			set.status = 200;
			return { message: "Revisão completa!" };
		} catch (error) {
			set.status = 500;
			return { error };
		}
	},
);

TasksRoutes.use(authentication).patch(
	"/tasks/defer",
	async ({ getLoggedUserId, set, body }) => {
		const user_id = (await getLoggedUserId()) as string;

		try {
			await tasksServices.deferDay(user_id, body.day);

			set.status = "OK";
			return { message: "Dia adiado" };
		} catch (error) {
			set.status = 500;
			return { error };
		}
	},
	{
		body: t.Object({
			day: t.Date(),
		}),
	},
);
