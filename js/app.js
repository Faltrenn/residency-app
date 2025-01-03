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

function setScripts() {
  const app = document.getElementById("app");
  const scripts = app.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    newScript.src = oldScript.src;

    document.body.appendChild(newScript);
    document.body.removeChild(newScript);
  });
}

async function renderPage(path) {
  const app = document.getElementById("app");
  try {
    switch (path) {
      case "/":
        app.innerHTML = await fetch("../pages/home.html").then((f) => f.text());
        break;
      case "/login":
        app.innerHTML = await fetch("../pages/login.html").then((f) => f.text());
        break;
      default:
        app.innerHTML = "<h1>404 Not Found</h1>";
        break;
    }
    setScripts();
  } catch (e) {
    console.error("Error loading page:", e);
    app.innerHTML = "<h1>Erro ao carregar a página</h1>";
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link && link.getAttribute("href")) {
    event.preventDefault();
    const path = link.getAttribute("href");
    window.history.pushState({}, "", path);
    renderPage(path);
  }
});

window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

renderPage(window.location.pathname);
