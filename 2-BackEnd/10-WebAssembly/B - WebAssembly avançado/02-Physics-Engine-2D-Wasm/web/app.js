import init, { simulate_step } from "../pkg/physics_engine_2d_wasm.js";
import { sampleWorld } from "./sample_world.js";
import { validateWorld } from "./validator.js";

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const playButton = document.querySelector("#play");
const resetButton = document.querySelector("#reset");
const statusLabel = document.querySelector("#status");

canvas.width = sampleWorld.config.width;
canvas.height = sampleWorld.config.height;

let running = false;
let bodies = structuredClone(sampleWorld.bodies);

function drawBodies() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#081226";
  context.fillRect(0, 0, canvas.width, canvas.height);

  bodies.forEach((body, index) => {
    context.beginPath();
    context.fillStyle = ["#38bdf8", "#f97316", "#22c55e"][index % 3];
    context.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
    context.fill();
  });
}

function tick() {
  if (!running) {
    return;
  }

  bodies = simulate_step(sampleWorld.config, bodies);
  drawBodies();
  statusLabel.textContent = `Bodies simulated: ${bodies.length}`;
  requestAnimationFrame(tick);
}

playButton.addEventListener("click", () => {
  running = !running;
  playButton.textContent = running ? "Pause" : "Play";

  if (running) {
    requestAnimationFrame(tick);
  }
});

resetButton.addEventListener("click", () => {
  bodies = structuredClone(sampleWorld.bodies);
  drawBodies();
  statusLabel.textContent = "World reset";
});

await init();
validateWorld(sampleWorld);
drawBodies();
