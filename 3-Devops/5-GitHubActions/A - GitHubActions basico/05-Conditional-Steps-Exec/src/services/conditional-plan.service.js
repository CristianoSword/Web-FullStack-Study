import { ConditionBranchModel } from "../models/condition-branch.model.js";

export class ConditionalPlanService {
  constructor({ spec }) {
    this.spec = spec;
  }

  buildPlan() {
    return {
      workflowName: this.spec.workflowName,
      defaultBranch: this.spec.defaultBranch,
      conditions: [
        new ConditionBranchModel({
          name: "run-tests-when-enabled",
          expression: "github.event.inputs.run_tests != 'false'",
          purpose: "Executa testes somente quando habilitado."
        }).name,
        new ConditionBranchModel({
          name: "deploy-preview-when-valid",
          expression: "steps.validation.outputs.is_valid == 'true' && github.event.inputs.deploy_preview == 'true'",
          purpose: "Faz deploy apenas com validacao aprovada."
        }).name,
        new ConditionBranchModel({
          name: "notify-on-failure",
          expression: "failure()",
          purpose: "Notifica falha quando algum step quebra."
        }).name
      ]
    };
  }
}
