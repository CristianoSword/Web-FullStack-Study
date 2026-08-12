export function validateWorld(world) {
  if (!world?.config || !Array.isArray(world?.bodies) || world.bodies.length === 0) {
    throw new Error("world configuration must include at least one body");
  }

  if (world.config.width <= 0 || world.config.height <= 0 || world.config.dt <= 0) {
    throw new Error("world dimensions and timestep must be positive");
  }
}
