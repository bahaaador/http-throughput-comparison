const server = Bun.serve({
  port: 3002,
  fetch(req) {
    return new Response(
      JSON.stringify({ message: 'Hello from Bun!' }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  },
});

console.log(`Bun server running on port ${server.port}`); 