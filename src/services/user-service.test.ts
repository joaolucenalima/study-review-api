import { beforeEach, describe, expect, test } from "bun:test";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-user-repository";
import { UserServices } from "./user.service";

let usersRepository: InMemoryUsersRepository;
let sut: UserServices;

describe("test user service", () => {
	const userData = {
		id: "n1-923fni2edn230",
		name: "John Doe",
		email: "johndoe@example.com",
		picture: "https://example.com/johndoe.jpg",
	};

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new UserServices(usersRepository);
	});

	test("should be possible to login", async () => {
		const user = await sut.login(userData);

		expect(user).toBeObject();
		expect(user.id).toEqual(expect.any(String));
	});

	test("should be possible to get profile", async () => {
		await sut.login(userData);

		const user = await sut.profile("johndoe@example.com");

		expect(user).toBeObject();
	});
});
