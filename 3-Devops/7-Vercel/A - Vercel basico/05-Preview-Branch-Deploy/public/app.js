async function loadContext() {
  const response = await fetch("/api/deploy-context");
  const payload = await response.json();
  const context = document.querySelector("#context");

  context.innerHTML = Object.entries(payload)
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

loadContext();
