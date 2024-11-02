const autocannon = require('autocannon');
const { promisify } = require('util');
const { writeFile } = require('fs').promises;

const run = promisify(autocannon);

const DURATION = 10; // seconds
const CONNECTIONS = 100;
const HOST = process.env.HOST || 'localhost';

async function runBenchmark(url, name) {
  console.log(`Running benchmark for ${name}...`);
  
  const result = await run({
    url,
    connections: CONNECTIONS,
    duration: DURATION,
    pipelining: 1,
  });

  return {
    name,
    requests: {
      average: result.requests.average,
      mean: result.requests.mean,
      stddev: result.requests.stddev,
      min: result.requests.min,
      max: result.requests.max,
    },
    latency: {
      average: result.latency.average,
      mean: result.latency.mean,
      stddev: result.latency.stddev,
      min: result.latency.min,
      max: result.latency.max,
    },
    throughput: {
      average: result.throughput.average,
      mean: result.throughput.mean,
      stddev: result.throughput.stddev,
      min: result.throughput.min,
      max: result.throughput.max,
    },
  };
}

async function main() {
  const servers = [
    { url: `http://${HOST}:3000`, name: 'Node.js' },
    { url: `http://${HOST}:3001`, name: 'Deno' },
    { url: `http://${HOST}:3002`, name: 'Bun' },
    { url: `http://${HOST}:3003`, name: 'Go' },
    { url: `http://${HOST}:3004`, name: 'Fastify' },
    { url: `http://${HOST}:3005`, name: 'Hono-Node' },
    { url: `http://${HOST}:3006`, name: 'Hono-Deno' },
    { url: `http://${HOST}:3007`, name: 'Hono-Bun' },
  ];

  const results = [];

  for (const server of servers) {
    try {
      const result = await runBenchmark(server.url, server.name);
      results.push(result);
    } catch (error) {
      console.error(`Error benchmarking ${server.name}:`, error);
    }
  }

  // Save results to file
  await writeFile(
    'benchmark-results.json',
    JSON.stringify(results, null, 2)
  );

  console.log('Benchmark complete! Results saved to benchmark-results.json');
}

main().catch(console.error); 