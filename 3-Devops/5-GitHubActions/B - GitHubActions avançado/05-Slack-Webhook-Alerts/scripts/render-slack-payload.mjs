import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/slack-alert-spec.json"), "utf8"));
const failureEvent = JSON.parse(fs.readFileSync(path.resolve(root, "samples/failure-event.json"), "utf8"));

const payload = {
  text: spec.title,
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: spec.title
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Workflow:*\n${failureEvent.workflow}`
        },
        {
          type: "mrkdwn",
          text: `*Job:*\n${failureEvent.job}`
        },
        {
          type: "mrkdwn",
          text: `*Status:*\n${failureEvent.status}`
        },
        {
          type: "mrkdwn",
          text: `*Environment:*\n${failureEvent.environment}`
        }
      ]
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `<${failureEvent.runUrl}|Open GitHub Actions run>`
      }
    }
  ]
};

fs.writeFileSync(path.resolve(root, "payloads/slack-alert.json"), JSON.stringify(payload, null, 2));
console.log("Slack payload rendered.");
