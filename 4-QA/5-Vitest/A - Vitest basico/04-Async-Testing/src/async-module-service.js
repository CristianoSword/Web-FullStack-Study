const modules = {
  queues: { name: "Queues", level: "advanced" },
  graphql: { name: "GraphQL", level: "intermediate" }
};

function fetchModule(slug, delayMs = 10) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const module = modules[slug];

      if (!module) {
        reject(new Error("Module not found."));
        return;
      }

      resolve(module);
    }, delayMs);
  });
}

module.exports = { fetchModule };
