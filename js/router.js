import { refreshRoleAndToken, role, token } from "./pages/login.js";

const ROLES = ["/Admin", "/Professor", "/Resident"];
const routes = {}; // Rotas {path: [callback, filePath]}

/**
 * Registra uma rota.
 * @param {string} path - Caminho da rota (ex: /login).
 * @param {function} callback - Função à ser executada quando redirecionar.
 * @param {string} filePath - Caminho do arquivo a ser carregado.
 **/
export function registerRoute(path, callback, filePath) {
  routes[path] = [callback, filePath];
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
    if (oldScript.type) {
      newScript.type = oldScript.type;
    }

    document.body.appendChild(newScript);
    document.body.removeChild(newScript);
  });
}

/**
 * Navegar para path
 * @param {string} path - Caminho da rota (ex: /login).
 * @param {int} elementID - Qual o id do elemento que a pagina será carregada.
 **/
export async function navigate(path, elementID) {
  await refreshRoleAndToken();

  if (!(path in routes)) {
    console.log(path)
    const app = document.getElementById(elementID);
    app.innerHTML = `<h1>404 Not Found</h1>`;
    return;
  }

  if (!token) {
    navigate("/login", "app");
    return;
  }

  if (path === "/login" || (path in ROLES && path != role)) {
    navigate(`/${role}`, "app");
    return;
  }

  window.history.pushState({}, "", path);
  renderPage(routes[path][1], elementID);
  if (routes[path]) routes[path][0]?.();
}

export async function renderPage(filePath, elementID) {
  const element = document.getElementById(elementID);
  try {
    element.innerHTML = await fetch(filePath).then((f) => f.text());
    setScripts(element);
  } catch (e) {
    console.error("Error loading page:", e);
    element.innerHTML = "<h1>Erro ao carregar a página</h1>";
  }
}
