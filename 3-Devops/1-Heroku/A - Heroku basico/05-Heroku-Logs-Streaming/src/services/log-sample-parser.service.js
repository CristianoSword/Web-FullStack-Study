import { createParsedLogEntry } from "../models/parsed-log-entry.model.js";

export class LogSampleParserService {
  constructor({ lines }) {
    this.lines = lines;
  }

  parseAll() {
    return this.lines.map((line) => this.parseLine(line));
  }

  parseLine(line) {
    const match = line.match(/^(\S+)\s+(\S+):\s+(.*)$/);

    if (!match) {
      return createParsedLogEntry({
        raw: line,
        timestamp: null,
        channel: "unknown",
        dyno: null,
        message: line
      });
    }

    const [, timestamp, channel, message] = match;
    const dynoMatch = channel.match(/\[(.+?)\]/);

    return createParsedLogEntry({
      raw: line,
      timestamp,
      channel: channel.split("[")[0],
      dyno: dynoMatch ? dynoMatch[1] : null,
      message
    });
  }
}
