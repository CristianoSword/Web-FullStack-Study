import { CommandGroupModel } from "../models/command-group.model.js";

export class CheatsheetSummaryService {
  constructor({ groups }) {
    this.groups = groups.map((group) => new CommandGroupModel(group));
  }

  buildSummary() {
    return {
      totalGroups: this.groups.length,
      totalCommands: this.groups.reduce((sum, group) => sum + group.commands.length, 0),
      groupNames: this.groups.map((group) => group.name)
    };
  }
}
