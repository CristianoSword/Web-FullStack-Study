const currentPage = document.body.dataset.page;

if (currentPage === "index") {
  document.querySelector("[data-track]").addEventListener("click", (event) => {
    localStorage.setItem("selectedTrack", event.currentTarget.dataset.track);
    window.location.href = "./courses.html";
  });
}

if (currentPage === "courses") {
  const selectedTrack = localStorage.getItem("selectedTrack") || "Nenhuma trilha";
  document.querySelector("#selected-track").textContent = `Trilha escolhida: ${selectedTrack}`;

  document.querySelectorAll("[data-course]").forEach((button) => {
    button.addEventListener("click", (event) => {
      localStorage.setItem("selectedCourse", event.currentTarget.dataset.course);
      window.location.href = "./summary.html";
    });
  });
}

if (currentPage === "summary") {
  const selectedTrack = localStorage.getItem("selectedTrack") || "Nenhuma trilha";
  const selectedCourse = localStorage.getItem("selectedCourse") || "Nenhum curso";

  document.querySelector("#summary-track").textContent = `Trilha: ${selectedTrack}`;
  document.querySelector("#summary-course").textContent = `Curso: ${selectedCourse}`;
}
