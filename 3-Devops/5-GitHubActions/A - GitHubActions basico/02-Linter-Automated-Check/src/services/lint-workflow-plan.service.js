import { LintTargetModel } from "../models/lint-target.model.js";
import { WorkflowStepModel } from "../models/workflow-step.model.js";

export class LintWorkflowPlanService {
  constructor({ targets }) {
    this.targets = new LintTargetModel(targets);
  }

  buildPlan() {
    return {
      nodeVersions: this.targets.nodeVersions,
      command: "npm run lint",
      include: this.targets.include,
      steps: [
        new WorkflowStepModel({ name: "checkout", purpose: "Baixa o repositorio no runner." }).name,
        new WorkflowStepModel({ name: "setup-node", purpose: "Configura o Node e o cache." }).name,
        new WorkflowStepModel({ name: "install-dependencies", purpose: "Instala dependencias do projeto." }).name,
        new WorkflowStepModel({ name: "run-eslint", purpose: "Executa o linter sobre os alvos configurados." }).name,
        new WorkflowStepModel({ name: "publish-summary", purpose: "Escreve o resumo do lint." }).name
      ]
    };
  }
}
