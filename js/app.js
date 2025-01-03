async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./serviceWorker.js");
    } catch (e) {
      console.log(`Error ${e}`);
    }
  }
}

window.addEventListener("load", () => {
  registerSW();
});

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
        app.innerHTML = await fetch("../pages/login.html").then((f) =>
          f.text(),
        );
        break;
      default:
        app.innerHTML = `${window.location.pathname}<h1>404 Not Found</h1>`;
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
