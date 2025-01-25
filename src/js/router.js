import { ROLES_PATH } from "./app.js";
import { addLogoutButtonIfNotExists, refreshRoleAndToken, role, token } from "../../pages/login/script.js";

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

/**
 * Executa os scripts da página.
 * @param {element} element - Onde que os scripts estão para serem carregados.
 **/
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
 * @param {string} elementID - Id do elemento onde a pagina será carregada.
 **/
export async function navigate(path, elementID, firstTime = true) {
  if (firstTime) await refreshRoleAndToken();

  if (!token && path != "/login") {
    navigate("/login", "app");
    return;
  }

  if (token) {
    if (
      !(path in routes) ||
      path === "/login" ||
      (Object.values(ROLES_PATH).includes(path) && path != `/${role}`)
    ) {
      navigate(`/${role}`, "app", false);
      return;
    }
  }

  window.history.pushState({}, "", path);
  await renderPage(routes[path][1], elementID);
  if (routes[path]) routes[path][0]?.();
}

/**
 * Carrega a página em um elemento de id especificado.
 * @param {string} filePath - Caminho do arquivo HTML a ser carregado.
 * @param {string} elementID - Id do elemento onde será carregada a página.
 **/
export async function renderPage(filePath, elementID) {
  addLogoutButtonIfNotExists();
  const element = document.getElementById(elementID);
  try {
    element.innerHTML = await fetch(filePath).then((f) => f.text());
    setScripts(element);
  } catch (e) {
    console.error("Error loading page:", e);
    element.innerHTML = "<h1>Erro ao carregar a página</h1>";
  }
}
