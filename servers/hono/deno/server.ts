import { Hono } from 'https://deno.land/x/hono/mod.ts'
import { serve } from 'https://deno.land/std/http/server.ts'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello from Hono on Deno!' })
})

serve(app.fetch, { port: 3006 })
console.log('Hono/Deno server running on port 3006') 