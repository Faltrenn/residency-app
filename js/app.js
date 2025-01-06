var role = localStorage.getItem("role");
var token = localStorage.getItem("token");

let routes = {
  "/": "../pages/home.html",
  "/home2": "../pages/home2.html",
  "/login": "../pages/login.html",
};

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
    //document.body.removeChild(newScript);
  });
}

async function setRouteToApp(path) {
  const app = document.getElementById("app");
  try {
    app.innerHTML = await fetch(path).then((f) => f.text());
    setScripts();
  } catch (e) {
    console.error("Error loading page:", e);
    app.innerHTML = "<h1>Erro ao carregar a página</h1>";
  }
}

async function renderPage(path) {
  if (token) {
    const response = await fetch("http://localhost:8000/login/check", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    if (!response.ok) {
      alert("Token expirado!");
      token = null;
      localStorage.clear();
    }
  }

  if (token || path === "/login") {
    if (path in routes) {
      setRouteToApp(routes[path]);
      return;
    }
    const app = document.getElementById("app");
    app.innerHTML = `<h1>404 Not Found</h1>`;
    return;
  }
  navigateTo("/login");
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  renderPage(path);
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
