import { RecoveryStepModel } from "../models/recovery-step.model.js";

export class RecoveryRunbookService {
  buildRunbook() {
    return [
      new RecoveryStepModel({
        name: "inspect-failed-job",
        command: "Review the failed GitHub Actions job log and artifact step.",
        purpose: "Separate test failures from deploy-host failures."
      }),
      new RecoveryStepModel({
        name: "verify-droplet-service",
        command: "ssh deploy@host 'pm2 status && systemctl status nginx --no-pager'",
        purpose: "Check whether the app or reverse proxy is unhealthy."
      }),
      new RecoveryStepModel({
        name: "repoint-current-release",
        command: "ssh deploy@host 'ln -sfn /opt/study-app/releases/<previous> /opt/study-app/current && pm2 reload ecosystem.config.cjs'",
        purpose: "Rollback to the last known-good release."
      }),
      new RecoveryStepModel({
        name: "rerun-workflow",
        command: "Use GitHub Actions rerun after fixing root cause.",
        purpose: "Rebuild confidence in the automated path after recovery."
      })
    ];
  }
}
