const modules = [
  "Dashboard de progresso",
  "Catálogo filtrável",
  "Relatórios exportáveis"
];

const params = new URLSearchParams(window.location.search);
const browser = params.get("browser") || "local";

document.querySelector("#browser-copy").textContent = `Projeto atual: ${browser}`;

const modulesContainer = document.querySelector("#modules");
modules.forEach((module) => {
  const article = document.createElement("article");
  article.className = "module";
  article.innerHTML = `<h2>${module}</h2><p>Fluxo smoke para validar compatibilidade visual.</p>`;
  modulesContainer.appendChild(article);
});
