import { modulePlan } from "./models/module-plan.js";
import { buildStudyPlan } from "./study-plan.js";

const plan = buildStudyPlan(modulePlan);
document.querySelector("#app").textContent = plan.summary;
