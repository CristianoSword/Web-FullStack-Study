export class ScriptSummaryService {
  buildSummary() {
    return {
      scripts: [
        { name: "provision.sh", purpose: "Inspect state and create or confirm DigitalOcean resources." },
        { name: "inspect.sh", purpose: "List droplets, firewall and load balancer after provisioning." },
        { name: "rollback.sh", purpose: "Tear down resources in safe reverse order." }
      ],
      operators: [
        "Run provision from a shell with authenticated doctl context.",
        "Run inspect after every apply window.",
        "Keep rollback ready before changing DNS."
      ]
    };
  }
}
