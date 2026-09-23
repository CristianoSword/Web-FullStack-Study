import { PubSub } from "graphql-subscriptions";

import { liveScoreStore } from "../models/live-score-store.js";

export const pubsub = new PubSub();
const SCORE_UPDATED = "SCORE_UPDATED";

export const resolvers = {
  Query: {
    latestScore: () => liveScoreStore.latestScore
  },
  Mutation: {
    publishScore: async (_, { input }) => {
      liveScoreStore.latestScore = { ...input };
      await pubsub.publish(SCORE_UPDATED, {
        scoreUpdated: { ...input }
      });
      return liveScoreStore.latestScore;
    }
  },
  Subscription: {
    scoreUpdated: {
      subscribe: async function* (_, { matchId }) {
        for await (const payload of pubsub.asyncIterableIterator(SCORE_UPDATED)) {
          if (payload.scoreUpdated.matchId === matchId) {
            yield payload;
          }
        }
      }
    }
  }
};
