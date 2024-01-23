import { Elysia } from 'elysia'

const server = new Elysia()
  .listen(3000, () => console.log("Elysia server is running on port 3000! 🧄"))

server.get('/', () => "hello world")