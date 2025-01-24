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
  if (!(path in routes)) {
    const app = document.getElementById(elementID);
    app.innerHTML = `<h1>404 Not Found</h1>`;
    return;
  }

  if (routes[path]) routes[path][0]?.();

  const element = document.getElementById(elementID);
  try {
    element.innerHTML = await fetch(routes[path][1]).then((f) => f.text());
    setScripts(element);
  } catch (e) {
    console.error("Error loading page:", e);
    element.innerHTML = "<h1>Erro ao carregar a página</h1>";
  }
}

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
