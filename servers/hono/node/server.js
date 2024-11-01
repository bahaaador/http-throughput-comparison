const { Hono } = require('hono')
const { serve } = require('@hono/node-server')

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello from Hono on Node.js!' })
})

serve({
  fetch: app.fetch,
  port: 3005
}, (info) => {
  console.log(`Hono/Node.js server running on port ${info.port}`)
}) 