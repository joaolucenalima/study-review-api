import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => "hello world");

app.listen(3000, () => console.log("Elysia server is running on port 3000! 🧄"));