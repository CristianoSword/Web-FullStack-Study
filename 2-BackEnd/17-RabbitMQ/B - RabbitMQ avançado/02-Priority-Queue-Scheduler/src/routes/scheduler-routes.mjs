export const registerSchedulerRoutes = async (app, { schedulerService }) => {
  app.get("/scheduler/state", async () => schedulerService.snapshot());

  app.post("/scheduler/jobs", async (request, reply) => {
    const job = schedulerService.schedule(request.body ?? {});
    reply.code(201);
    return {
      message: "Job scheduled",
      job
    };
  });

  app.post("/scheduler/dispatch", async () => schedulerService.dispatchDueJobs());
};
