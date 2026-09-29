function offsetsToMap(offsets) {
  return new Map(offsets.map((entry) => [entry.partition, entry]));
}

export function formatTopicReport(topicMetadata, topicOffsets) {
  const partitionOffsets = offsetsToMap(topicOffsets);

  return {
    topic: topicMetadata.name,
    partitionCount: topicMetadata.partitions.length,
    partitions: topicMetadata.partitions.map((partition) => {
      const offset = partitionOffsets.get(partition.partitionId);

      return {
        partitionId: partition.partitionId,
        leader: partition.leader,
        replicas: partition.replicas,
        isr: partition.isr,
        highOffset: offset?.high ?? null,
        lowOffset: offset?.low ?? null,
        committedOffset: offset?.offset ?? null
      };
    })
  };
}

export function formatGroupReport(groupId, description, groupOffsets, topicReports) {
  const topicReportMap = new Map(topicReports.map((report) => [report.topic, report]));

  return {
    groupId,
    state: description?.state ?? "Unknown",
    protocol: description?.protocol ?? null,
    protocolType: description?.protocolType ?? null,
    members: (description?.members ?? []).map((member) => ({
      memberId: member.memberId,
      clientId: member.clientId,
      clientHost: member.clientHost
    })),
    offsets: groupOffsets.flatMap((topicOffset) => {
      const topicReport = topicReportMap.get(topicOffset.topic);
      const partitionReportMap = new Map(
        (topicReport?.partitions ?? []).map((partition) => [partition.partitionId, partition])
      );

      return topicOffset.partitions.map((partitionOffset) => {
        const partitionReport = partitionReportMap.get(partitionOffset.partition);
        const committedOffset = Number.parseInt(partitionOffset.offset ?? "0", 10);
        const highOffset = Number.parseInt(partitionReport?.highOffset ?? "0", 10);

        return {
          topic: topicOffset.topic,
          partition: partitionOffset.partition,
          offset: partitionOffset.offset,
          metadata: partitionOffset.metadata,
          highOffset: partitionReport?.highOffset ?? null,
          lowOffset: partitionReport?.lowOffset ?? null,
          lag:
            Number.isNaN(committedOffset) || Number.isNaN(highOffset)
              ? null
              : Math.max(highOffset - committedOffset, 0)
        };
      });
    })
  };
}

export function formatGroupsOverview(groups) {
  return groups.map((group) => ({
    groupId: group.groupId,
    protocolType: group.protocolType
  }));
}

