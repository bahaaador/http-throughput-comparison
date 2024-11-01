import { serve } from "https://deno.land/std/http/server.ts";

const handler = (req: Request): Response => {
  return new Response(
    JSON.stringify({ message: 'Hello from Deno!' }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    },
  );
};

await serve(handler, { port: 3001 }); 