const fastify = require('fastify')({ logger: false })

fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify!' }
})

const start = async () => {
  try {
    await fastify.listen({ 
      port: 3004,
      host: '0.0.0.0',
      ipv6: false
    })
    console.log(`Fastify server running on port 3004`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start() 