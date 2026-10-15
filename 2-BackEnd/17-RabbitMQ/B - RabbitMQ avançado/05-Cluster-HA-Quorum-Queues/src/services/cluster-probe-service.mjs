import { clusterNodes, summarizeNodeHealth } from "../../models/cluster-node.mjs";
import { quorumPolicy, failoverChecklist } from "../../models/ha-policy.mjs";
import { clusterTopology } from "../../topology/cluster-topology.mjs";
import { fetchManagementResource } from "../lib/rabbitmq-connection.mjs";

export class ClusterProbeService {
  async snapshot() {
    const [nodes, queues, overview] = await Promise.all([
      fetchManagementResource("nodes"),
      fetchManagementResource("queues/%2F"),
      fetchManagementResource("overview")
    ]);

    const quorumQueue = queues.find((queue) => queue.name === clusterTopology.queue);

    return {
      clusterName: overview.cluster_name,
      rabbitmqVersion: overview.rabbitmq_version,
      nodes: summarizeNodeHealth(
        clusterNodes.map((node) => ({
          ...node,
          ...(nodes.find((candidate) => candidate.name === node.name) ?? {})
        }))
      ),
      quorumQueue: quorumQueue
        ? {
            name: quorumQueue.name,
            leader: quorumQueue.leader,
            members: quorumQueue.members,
            online: quorumQueue.online,
            messages: quorumQueue.messages,
            state: quorumQueue.state
          }
        : null,
      policy: quorumPolicy,
      failoverChecklist
    };
  }
}
