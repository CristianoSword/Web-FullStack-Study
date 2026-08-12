export const sampleWorld = {
  config: {
    width: 720,
    height: 420,
    gravity: 420,
    damping: 0.985,
    dt: 0.016
  },
  bodies: [
    { x: 120, y: 60, vx: 120, vy: 0, radius: 16, mass: 1.0 },
    { x: 260, y: 120, vx: -90, vy: 10, radius: 22, mass: 1.2 },
    { x: 460, y: 80, vx: 65, vy: -20, radius: 18, mass: 0.8 }
  ]
};
