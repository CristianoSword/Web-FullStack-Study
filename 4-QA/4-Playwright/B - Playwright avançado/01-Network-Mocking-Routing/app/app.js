const heroImage = document.querySelector("#hero-image");
const heroStatus = document.querySelector("#hero-status");
const lessonGrid = document.querySelector("#lesson-grid");
const reloadButton = document.querySelector("#reload-button");

heroImage.addEventListener("load", () => {
  heroStatus.textContent = "Imagem carregada da CDN externa.";
});

heroImage.addEventListener("error", () => {
  heroStatus.textContent = "Imagem opcional desativada para acelerar o teste.";
});

async function loadLessons() {
  lessonGrid.innerHTML = "<p>Carregando módulos...</p>";

  try {
    const response = await fetch("https://third-party.local/api/lessons");
    const payload = await response.json();

    lessonGrid.innerHTML = "";
    payload.lessons.forEach((lesson) => {
      const article = document.createElement("article");
      article.className = "lesson";
      article.innerHTML = `<h2>${lesson.title}</h2><p>${lesson.summary}</p>`;
      lessonGrid.appendChild(article);
    });
  } catch (error) {
    lessonGrid.innerHTML = `<article class="lesson"><h2>Falha de rede</h2><p>${error.message}</p></article>`;
  }
}

reloadButton.addEventListener("click", loadLessons);
loadLessons();
