import { beforeEach, describe, expect, test } from "bun:test";
import { InMemoryTasksRepository } from "../repositories/in-memory/in-memory-tasks-repository";
import { TasksServices } from "./task.service";

let tasksRepository: InMemoryTasksRepository;
let sut: TasksServices;

describe("test tasks services", () => {
	beforeEach(() => {
		tasksRepository = new InMemoryTasksRepository();
		sut = new TasksServices(tasksRepository);
	});

	test("should be possible to get all today tasks", async () => {
		const tasks = await sut.findTasks("id-teste");

		expect(tasks).toBeArray();
		expect(tasks).toHaveLength(1);
	});
});
