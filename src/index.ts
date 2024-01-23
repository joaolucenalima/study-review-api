import { Elysia } from "elysia";

const server = new Elysia();

server.get("/", () => "hello world");

server.listen(3000, () => console.log("Elysia server is running on port 3000! 🧄"));