import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello from Hono on Bun!' })
})

export default {
  port: 3007,
  fetch: app.fetch,
}

console.log('Hono/Bun server running on port 3007') 