const statusPill = document.querySelector("[data-testid='status-pill']");
const syncButton = document.querySelector("#sync-button");
const lessonList = document.querySelector("#lesson-list");
const openPlanButton = document.querySelector("#open-plan");
const reviewPanel = document.querySelector("#review-panel");

syncButton.addEventListener("click", () => {
  syncButton.disabled = true;
  statusPill.textContent = "Sincronizando aulas...";

  window.setTimeout(() => {
    statusPill.textContent = "Concluido";
    lessonList.classList.remove("hidden");
    openPlanButton.classList.remove("hidden");
  }, 1100);
});

openPlanButton.addEventListener("click", () => {
  reviewPanel.classList.remove("hidden");
});
