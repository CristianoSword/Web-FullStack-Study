import { buildGreeting } from "../models/greeting.js";

export const queryResolvers = {
  hello: (_, { name }) => buildGreeting(name)
};
