const loginForm = document.querySelector("#login-form");
const dashboard = document.querySelector("#dashboard");
const welcome = document.querySelector("#welcome");
const selectedTrack = document.querySelector("#selected-track");
const logoutButton = document.querySelector("#logout");

function renderSession() {
  const userName = sessionStorage.getItem("userName");
  const track = sessionStorage.getItem("track");

  if (!userName || !track) {
    loginForm.classList.remove("hidden");
    dashboard.classList.add("hidden");
    return;
  }

  loginForm.classList.add("hidden");
  dashboard.classList.remove("hidden");
  welcome.textContent = `Sessão ativa de ${userName}`;
  selectedTrack.textContent = `Trilha atual: ${track}`;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sessionStorage.setItem("userName", loginForm.userName.value.trim());
  sessionStorage.setItem("track", loginForm.track.value);
  renderSession();
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("track");
  renderSession();
});

renderSession();
