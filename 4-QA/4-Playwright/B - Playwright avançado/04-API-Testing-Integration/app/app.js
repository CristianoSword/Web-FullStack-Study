const status = document.querySelector("#status");
const refreshButton = document.querySelector("#refresh-button");
const moduleGrid = document.querySelector("#module-grid");

async function loadModules() {
  status.textContent = "Sincronizando dados da API...";
  const response = await fetch("/api/modules");
  const payload = await response.json();

  moduleGrid.innerHTML = "";
  payload.modules.forEach((module) => {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <h2>${module.title}</h2>
      <p>Status: ${module.reviewed ? "Revisado" : "Pendente"}</p>
    `;
    moduleGrid.appendChild(article);
  });

  status.textContent = `Módulos carregados: ${payload.modules.length}`;
}

refreshButton.addEventListener("click", loadModules);
loadModules();
