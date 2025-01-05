var role = localStorage.getItem("role");
var token = localStorage.getItem("token");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("../serviceWorker.js")
      .then(() => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

function setScripts() {
  const app = document.getElementById("app");
  const scripts = app.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    if (oldScript.hasAttribute("src")) {
      newScript.src = oldScript.src;
    } else {
      newScript.textContent = oldScript.textContent;
    }

    document.body.appendChild(newScript);
    document.body.removeChild(newScript);
  });
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  renderPage(path);
}

async function renderPage(path) {
  const app = document.getElementById("app");
  //app.innerHTML = await fetch("../pages/login.html").then((f) => f.text());
  //setScripts();
  //return;
  try {
    switch (path) {
      case "/":
        app.innerHTML = await fetch("../pages/home.html").then((f) => f.text());
        break;
      case "/home2":
        app.innerHTML = await fetch("../pages/home2.html").then((f) =>
          f.text(),
        );
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
    navigateTo(path);
  }
});

window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

renderPage(window.location.pathname);
