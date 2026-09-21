import { services } from "../models/services.js";

export const resolvers = {
  Query: {
    services: () => services,
    service: (_, { id }) => services.find((service) => service.id === id) ?? null
  }
};
