const { runReport } = require("./cli/run-report");

function run() {
  return runReport(["1,hardware,200", "2,software,450"]);
}

module.exports = {
  run,
};
