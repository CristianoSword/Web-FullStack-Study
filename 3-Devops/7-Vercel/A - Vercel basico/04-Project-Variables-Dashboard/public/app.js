async function loadConfig() {
  const response = await fetch("/api/config");
  const payload = await response.json();
  const cards = document.querySelector("#cards");

  cards.innerHTML = Object.entries(payload)
    .map(
      ([key, value]) => `
        <article class="card">
          <h2>${key}</h2>
          <p>${value}</p>
        </article>
      `
    )
    .join("");
}

loadConfig();
