const { runReport } = require("./cli/run-report");
const path = require("path");

async function run(filePath = path.resolve(__dirname, "../data/sales.csv")) {
  return runReport(filePath);
}

if (require.main === module) {
  const inputPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : undefined;

  run(inputPath)
    .then((summary) => {
      console.log(JSON.stringify(summary, null, 2));
    })
    .catch((error) => {
      console.error("Stream processor failed:", error.message);
      process.exitCode = 1;
    });
}

module.exports = {
  run,
};
