const pageType = document.body.dataset.page;

if (pageType === "login") {
  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    sessionStorage.setItem("name", form.name.value.trim());
    sessionStorage.setItem("track", form.track.value.trim());
    window.location.href = "./dashboard.html";
  });
}

if (pageType === "dashboard") {
  const name = sessionStorage.getItem("name") || "Aluno";
  const track = sessionStorage.getItem("track") || "Sem trilha";
  document.querySelector("#student-copy").textContent = `${name} está estudando ${track}.`;
}
