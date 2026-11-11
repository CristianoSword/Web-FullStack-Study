import http from 'http';
import dotenv from 'dotenv';
import { AppConfigSchema, MetricModel } from './models/schema.js';
import { CoreEngine } from './services/core-engine.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const engine = new CoreEngine({ service: process.env.SERVICE_NAME || "01-Cloud-Run-Serverless-Containers" });

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
  } else if (req.url === '/run' && req.method === 'POST') {
    const result = engine.executeAction('trigger_pipeline');
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, result }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`01-Cloud-Run-Serverless-Containers laboratory running on port ${PORT}`);
});
