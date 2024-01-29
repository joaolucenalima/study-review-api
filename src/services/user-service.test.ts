import { beforeEach, describe, expect, test } from "bun:test";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-user-repository";
import { UserServices } from "./user.service";

let usersRepository: InMemoryUsersRepository;
let sut: UserServices;

describe("test user service", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new UserServices(usersRepository);
	});

	test("should be possible to login", async () => {
		const userData = {
			name: "joão",
			email: "joao@gmail.com",
			picture: "wnqodnqwofwqfkdqwdow",
		};

		const user = await sut.login(userData);

		expect(user).toBeObject();
		expect(user.id).toEqual(expect.any(String));
	});

	test("should be possible to get profile", async () => {
		const userData = {
			name: "joão",
			email: "joao@gmail.com",
			picture: "wnqodnqwofwqfkdqwdow",
		};

		await sut.login(userData);

		const user = await sut.profile("joao@gmail.com");

		expect(user).toBeObject();
	});
});
