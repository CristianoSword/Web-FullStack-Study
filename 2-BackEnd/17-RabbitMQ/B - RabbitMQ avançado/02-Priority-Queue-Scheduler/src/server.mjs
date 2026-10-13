import Fastify from "fastify";

import { runtimeConfig } from "../config/runtime-config.mjs";
import { registerHealthRoutes } from "./routes/health-routes.mjs";
import { registerSchedulerRoutes } from "./routes/scheduler-routes.mjs";
import { JobSchedulerService } from "./services/job-scheduler-service.mjs";
import { PriorityWorkerService } from "./services/priority-worker-service.mjs";

const app = Fastify({ logger: true });
const schedulerService = new JobSchedulerService();
const workerService = new PriorityWorkerService({ schedulerService });

app.setErrorHandler((error, _request, reply) => {
  reply.code(400).send({
    error: error.message
  });
});

await registerHealthRoutes(app);
await registerSchedulerRoutes(app, { schedulerService });

const start = async () => {
  await workerService.start();

  setInterval(async () => {
    try {
      await schedulerService.dispatchDueJobs();
    } catch (error) {
      app.log.error(error);
    }
  }, 2000);

  await app.listen({ port: runtimeConfig.app.port, host: "0.0.0.0" });
};

start().catch((error) => {
  app.log.error(error);
  process.exit(1);
});
