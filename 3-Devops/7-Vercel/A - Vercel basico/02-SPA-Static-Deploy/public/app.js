const routes = {
  "/": {
    title: "Home",
    body: "Single-page app pronta para servir como site estatico na Vercel."
  },
  "/catalog": {
    title: "Catalog",
    body: "Lista das trilhas de estudo com navegacao client-side."
  },
  "/progress": {
    title: "Progress",
    body: "Painel de progresso local sem depender de servidor dedicado."
  }
};

function render() {
  const app = document.querySelector("#app");
  const currentRoute = routes[window.location.pathname] || routes["/"];

  app.innerHTML = `
    <section class="card">
      <h2>${currentRoute.title}</h2>
      <p>${currentRoute.body}</p>
    </section>
  `;
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || link.target === "_blank" || link.origin !== window.location.origin) {
    return;
  }

  event.preventDefault();
  window.history.pushState({}, "", link.getAttribute("href"));
  render();
});

window.addEventListener("popstate", render);
render();
