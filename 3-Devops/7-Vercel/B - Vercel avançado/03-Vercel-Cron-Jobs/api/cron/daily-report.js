import { ensureCronAuthorized } from "../../lib/cron-auth.js";
import { json, unauthorized } from "../../lib/response.js";
import { buildDailyReport } from "../../lib/tasks.js";

export default function handler(request, response) {
  if (!ensureCronAuthorized(request, process.env.CRON_SECRET)) {
    return unauthorized(response, "Invalid cron secret.");
  }

  return json(response, 200, buildDailyReport());
}
