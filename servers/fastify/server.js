const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify!' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3004 })
    console.log(`Fastify server running on port 3004`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start() 