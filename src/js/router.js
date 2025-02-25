import { ROLES_PATH, backButton, logoutButton, pageTitle } from "./app.js";
import {
  refreshRoleAndToken,
  role,
  token,
} from "../../pages/login/login.js";

const routes = {}; // Rotas {path: [callback, filePath]}

let navigationCount = null;

/**
 * Registra uma rota.
 * @param {string} path - Caminho da rota (ex: /login).
 * @param {function} callback - Função à ser executada quando redirecionar.
 * @param {string} filePath - Caminho do arquivo a ser carregado.
 **/
export function registerRoute(path, callback, filePath, pageTitle) {
  routes[path] = [callback, filePath, pageTitle];
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
 * Navigate to a given path
 *
 * @async
 * @param {string} path - path (ex: /login).
 * @param {object} data - Relevant data to the route.
 * @param {bool} backwards - If is a backward navigation.
 * @param {bool} [firstTime] - If is first time running.
 * @returns {Promise<void>}
 */
export async function navigate(path, data, backwards, firstTime = true) {
  if (firstTime) await refreshRoleAndToken();

  if (!token && path != "/login") {
    navigate("/login", data, backwards, false);
    navigationCount = -1;
    return;
  }

  if (token) {
    if (
      !(path in routes) ||
      path === "/login" ||
      (Object.values(ROLES_PATH).includes(path) && path != `/${role}`)
    ) {
      navigate(`/${role}`, data, backwards, false);
      return;
    }
  }

  if (!backwards) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      navigationCount = navigationCount == null ? 0 : navigationCount + 1;
    }
  } else {
    navigationCount--;
  }

  //backButton.className =
  //  initialHistoryLength != history.length ? "" : "invisible";
  backButton.className = navigationCount > 0 ? "" : "invisible";

  await renderPage(routes[path][1], "app", routes[path][2]);
  if (routes[path]) routes[path][0]?.(data);
}

/**
 * Carrega a página em um elemento de id especificado.
 * @param {string} filePath - Caminho do arquivo HTML a ser carregado.
 * @param {string} elementID - Id do elemento onde será carregada a página.
 **/
export async function renderPage(filePath, elementID, pTitle) {
  logoutButton.className = "";

  const element = document.getElementById(elementID);
  try {
    element.innerHTML = await fetch(filePath).then((f) => f.text());
    setScripts(element);

    pageTitle.textContent = pTitle;
    pageTitle.hidden = pTitle == null;
  } catch (e) {
    console.error("Error loading page:", e);
    element.innerHTML = "<h1>Erro ao carregar a página</h1>";
  }
}
