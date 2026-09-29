import { createKafkaClient } from "../lib/create-client.mjs";
import { formatGroupReport, formatGroupsOverview, formatTopicReport } from "../lib/formatters.mjs";
import { loadConfig } from "../lib/load-config.mjs";

function printJson(payload) {
  console.log(JSON.stringify(payload, null, 2));
}

async function loadTopicReports(admin, topics) {
  if (topics.length === 0) {
    return [];
  }

  const metadata = await admin.fetchTopicMetadata({ topics });

  return Promise.all(
    metadata.topics.map(async (topicMetadata) => {
      const offsets = await admin.fetchTopicOffsets(topicMetadata.name);
      return formatTopicReport(topicMetadata, offsets);
    })
  );
}

async function runTopicsCommand(admin, config) {
  const topics = await admin.listTopics();
  const reports = await loadTopicReports(admin, topics);

  printJson({
    broker: config.broker,
    topicCount: reports.length,
    topics: reports
  });
}

async function runTopicCommand(admin, topicName) {
  const reports = await loadTopicReports(admin, [topicName]);

  if (reports.length === 0) {
    throw new Error(`Topic not found: ${topicName}`);
  }

  printJson(reports[0]);
}

async function runGroupsCommand(admin, config) {
  const groupsOverview = await admin.listGroups();
  const topicReports = await loadTopicReports(
    admin,
    config.sampleTopics.map((topic) => topic.name)
  );

  const groups = await Promise.all(
    formatGroupsOverview(groupsOverview.groups).map(async (group) => {
      const descriptions = await admin.describeGroups([group.groupId]);
      const groupOffsets = await admin.fetchOffsets({
        groupId: group.groupId,
        topics: config.sampleTopics.map((topic) => topic.name),
        resolveOffsets: true
      });

      return formatGroupReport(group.groupId, descriptions.groups[0], groupOffsets, topicReports);
    })
  );

  printJson({
    groupCount: groups.length,
    groups
  });
}

async function runGroupCommand(admin, config, groupId) {
  const descriptions = await admin.describeGroups([groupId]);
  const topicReports = await loadTopicReports(
    admin,
    config.sampleTopics.map((topic) => topic.name)
  );
  const groupOffsets = await admin.fetchOffsets({
    groupId,
    topics: config.sampleTopics.map((topic) => topic.name),
    resolveOffsets: true
  });

  if (!descriptions.groups[0]) {
    throw new Error(`Consumer group not found: ${groupId}`);
  }

  printJson(formatGroupReport(groupId, descriptions.groups[0], groupOffsets, topicReports));
}

function parseCommand(argv) {
  const [command, argument] = argv;

  if (!command) {
    throw new Error("Usage: node src/cli/explorer.mjs <topics|topic|groups|group> [name]");
  }

  return { command, argument };
}

const config = await loadConfig();
const kafka = createKafkaClient(config);
const admin = kafka.admin();
const { command, argument } = parseCommand(process.argv.slice(2));

try {
  await admin.connect();

  if (command === "topics") {
    await runTopicsCommand(admin, config);
  } else if (command === "topic") {
    if (!argument) {
      throw new Error("Usage: node src/cli/explorer.mjs topic <topic-name>");
    }

    await runTopicCommand(admin, argument);
  } else if (command === "groups") {
    await runGroupsCommand(admin, config);
  } else if (command === "group") {
    if (!argument) {
      throw new Error("Usage: node src/cli/explorer.mjs group <group-id>");
    }

    await runGroupCommand(admin, config, argument);
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} finally {
  await admin.disconnect();
}

