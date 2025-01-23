var role = localStorage.getItem("role");
var token = localStorage.getItem("token");

async function verifyToken() {
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
      role = null;
      localStorage.clear();
      return;
    }
    const data = await response.json();

    localStorage.setItem("role", data["role"]);
  }
}

async function refreshRoleAndToken() {
  await verifyToken();

  role = localStorage.getItem("role");
  token = localStorage.getItem("token");
}

let routes = {
  "/": "../pages/home.html",
  "/home2": "../pages/home2.html",
  "/login": "../pages/login.html",
  "/users": "../pages/users/index.html"
};

async function loadPage(path) {
  return await fetch(path).then((f) => f.text());
}

function setScripts(element) {
  const scripts = element.querySelectorAll("script");
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

async function setRouteToApp(path, elementID) {
  const element = document.getElementById(elementID);
  try {
    element.innerHTML = await fetch(path).then((f) => f.text());
    setScripts(element);
  } catch (e) {
    console.error("Error loading page:", e);
    element.innerHTML = "<h1>Erro ao carregar a página</h1>";
  }
}

async function renderPage(path) {
  await refreshRoleAndToken();

  if (token || path === "/login") {
    if (path in routes) {
      setRouteToApp(routes[path], "app");
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

function reloadWindow() {
  renderPage(window.location.pathname);
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

reloadWindow();

