const form = document.querySelector("#login-form");
const feedback = document.querySelector("#feedback");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const remember = form.remember.checked;
  const errors = [];

  if (!email.includes("@")) {
    errors.push("Informe um email válido.");
  }

  if (password.length < 8) {
    errors.push("A senha precisa ter ao menos 8 caracteres.");
  }

  if (!remember) {
    errors.push("Confirme que deseja salvar a sessão neste dispositivo.");
  }

  if (errors.length > 0) {
    feedback.className = "";
    feedback.textContent = errors.join(" ");
    return;
  }

  feedback.className = "success";
  feedback.textContent = "Login validado para continuar o treino.";
});
