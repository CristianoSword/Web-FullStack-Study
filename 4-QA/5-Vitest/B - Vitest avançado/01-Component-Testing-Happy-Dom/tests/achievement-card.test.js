const { describe, expect, it } = require("vitest");
const { achievementProps } = require("../src/models/achievement-props");
const { renderAchievementCard } = require("../src/achievement-card");

describe("renderAchievementCard", () => {
  it("renderiza um componente em DOM emulado", () => {
    const element = renderAchievementCard(achievementProps);
    document.body.appendChild(element);

    expect(document.querySelector(".achievement-card h2").textContent).toBe(achievementProps.title);
    expect(document.querySelector(".achievement-card p").textContent).toBe(achievementProps.description);
  });
});
