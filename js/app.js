//const app = document.getElementById("app");
//const route = window.location.pathname;
//async function loadContent(id) {
//  app.innerHTML = await fetch(
//    id === 0 ? "../pages/home.html" : "../pages/login.html",
//  ).then((r) => r.text());
//
//  // Executa os scripts embutidos manualmente
//  const scripts = app.querySelectorAll("script");
//  scripts.forEach((oldScript) => {
//    const newScript = document.createElement("script");
//    newScript.src = oldScript.src;
//    // Adicionar script e remover após executado
//    document.body.appendChild(newScript);
//    document.body.removeChild(newScript);
//  });
//}
//
//loadContent(0)

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const path = link.getAttribute("href");
    window.history.pushState({}, "", path);
    renderPage(path);
  });
});

window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

async function renderPage(path) {
  const app = document.getElementById("app");
  switch (path) {
    case "/":
      fetch("../pages/home.html")
        .then((f) => f.text())
        .then((html) => (app.innerHTML = html));
      break;
    case "/login":
      fetch("../pages/login.html")
        .then((f) => f.text())
        .then((html) => (app.innerHTML = html));
      break;
    default:
      app.innerHTML = "<h1>404 Not Found</h1>";
  }
}

renderPage(window.location.pathname);
