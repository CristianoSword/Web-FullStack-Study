const tracks = [
  {
    slug: "frontend",
    name: "Frontend",
    lessons: 12,
    focus: "Interfaces acessiveis, CSS moderno e consumo de APIs."
  },
  {
    slug: "backend",
    name: "BackEnd",
    lessons: 18,
    focus: "APIs, filas, bancos de dados e observabilidade."
  },
  {
    slug: "qa",
    name: "QA",
    lessons: 9,
    focus: "Estruturas de automacao, cobertura e testes E2E."
  }
];

const catalogElement = document.querySelector("#catalog");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const detailsName = document.querySelector("#details-name");
const detailsFocus = document.querySelector("#details-focus");
const detailsLessons = document.querySelector("#details-lessons");

function selectTrack(track) {
  detailsName.innerHTML = `<strong>${track.name}</strong>`;
  detailsFocus.textContent = track.focus;
  detailsLessons.textContent = `${track.lessons} aulas planejadas`;
}

function renderCatalog(activeFilter = "all") {
  const visibleTracks =
    activeFilter === "all"
      ? tracks
      : tracks.filter((track) => track.slug === activeFilter);

  catalogElement.innerHTML = "";

  visibleTracks.forEach((track) => {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <div class="card-header">
        <h2>${track.name}</h2>
        <span class="badge">${track.lessons} aulas</span>
      </div>
      <p>${track.focus}</p>
      <button type="button" data-select="${track.slug}">Abrir trilha</button>
    `;
    catalogElement.appendChild(article);
  });

  const selectedTrack = visibleTracks[0] || tracks[0];
  selectTrack(selectedTrack);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCatalog(button.dataset.filter);
  });
});

catalogElement.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-select]");
  if (!trigger) {
    return;
  }

  const track = tracks.find((item) => item.slug === trigger.dataset.select);
  if (track) {
    selectTrack(track);
  }
});

renderCatalog();
