const path = require("path");

const LOG_DIR = path.join(__dirname, "..", "logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

module.exports = {
  LOG_DIR,
  LOG_FILE,
};
