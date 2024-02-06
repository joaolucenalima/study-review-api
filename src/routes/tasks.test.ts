import { beforeAll, describe, expect, test } from "bun:test";
import { app } from "..";

interface MakeRequestProps {
	body?: string;
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
}

const BASE_URL = "http://localhost:1337";

async function makeRequest({ body, url, method }: MakeRequestProps) {
	const response = await app.handle(
		new Request(`${BASE_URL}${url}`, {
			method,
			body,
		}),
	);

	const data = await response.json();

	return { data, status: response.status };
}

describe("tasks routes test (E2E)", () => {
	beforeAll(() => {});

	test("get tasks from user", async () => {
		const { data, status } = await makeRequest({
			url: "/tasks",
			method: "GET",
		});

		expect(status).toBe(200);
		expect(data).toEqual([]);
	});
});
