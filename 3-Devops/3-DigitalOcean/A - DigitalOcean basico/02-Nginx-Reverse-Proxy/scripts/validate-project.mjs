import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "config/settings.json",
  "config/upstream.json",
  "nginx/nginx.conf",
  "nginx/sites-available/study-app.conf",
  "app/server.js",
  "systemd/study-app.service",
  "src/main.js",
  "src/test.js",
  "src/models/proxy-route.model.js",
  "src/models/service-unit.model.js",
  "src/models/upstream-target.model.js",
  "src/services/nginx-plan.service.js",
  "src/services/proxy-health.service.js",
  "src/services/systemd-service.service.js",
  "scripts/check-nginx-proxy.ps1"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const siteConfig = fs.readFileSync(path.resolve(root, "nginx/sites-available/study-app.conf"), "utf8");
for (const token of ["upstream study_app", "proxy_pass http://study_app", "location /health"]) {
  if (!siteConfig.includes(token)) {
    throw new Error(`Missing nginx token: ${token}`);
  }
}

console.log("Nginx Reverse Proxy project validation passed.");
