const { runGridSuite } = require("./run-grid-suite.js");

async function run() {
  const pageUrl = process.env.GRID_TARGET_URL || "http://host.docker.internal:4302/index.html";
  const results = await Promise.all([
    runGridSuite("chrome", pageUrl),
    runGridSuite("firefox", pageUrl)
  ]);

  console.log(results);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
