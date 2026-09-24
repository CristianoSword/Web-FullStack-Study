import { billingSummary } from "../models/billing-summary.js";
import { reports } from "../models/reports.js";

export const resolvers = {
  Query: {
    publicFeed: () => [
      "GraphQL auth directives deployed.",
      "Viewer context now resolves user scopes."
    ],
    me: (_, __, { currentUser }) => currentUser,
    adminReports: () => reports,
    billingSummary: () => billingSummary
  }
};
