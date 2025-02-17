import { navigate } from "../../src/js/router.js";
import { fetchAPI } from "../../src/js/utils.js";

export let role = localStorage.getItem("role");
export let token = localStorage.getItem("token");

export function startLogin() {
  document.getElementById("btn-logout")?.remove();

  document.getElementById("login-form").addEventListener("submit", (event) => {
    login(event);
  });
}

/**
 * Verifica na api se o token ainda está válido.
 *
 * @async
 * @returns {Promise<void>}
 */
async function verifyToken() {
  if (token) {
    try {
      const data = await fetchAPI("/login/check", "GET", {}, {});
      localStorage.setItem("role", data["role"]);
    } catch(e){
      alert("Token expirado!", e);
      logout();
      return;
    }
  }
}

/**
 * Atualiza role e token.
 *
 * @async
 * @returns {Promise<void>}
 */
export async function refreshRoleAndToken() {
  await verifyToken();

  role = localStorage.getItem("role");
  token = localStorage.getItem("token");
}

/**
 * Tenta realizar o login, se bem sucessido, recebe token e role que são armazenados, caso contrário, erro.
 *
 * @async
 * @param {event} event - Evento de submit do form.
 * @throws {Error} - Caso o login der errado, pode ser: usuário e senha incorretos, erro interno da api e api fora do ar.
 * @returns {Promise<void>}
 */
export async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const data = await fetchAPI(
      "/login",
      "POST",
      {},
      { user: username, pass: password },
    );

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    role = data.role;
    token = data.token;
    navigate(`/${role}`, "app");
  } catch (error) {
    alert(`Não foi possível realizar o login. Tente novamente.\n${error}`);
  }
}

/**
 * Faz o logout removendo role e token da memória.
 *
 */
export function logout() {
  localStorage.clear();
  role = null;
  token = null;
  navigate("/login", "app");
}

export function addLogoutButtonIfNotExists() {
  if (!document.getElementById("btn-logout")) {
    const btn = document.createElement("button");
    btn.id = "btn-logout";
    btn.textContent = "Logout";
    btn.addEventListener("click", () => {
      logout();
    });
    document.getElementById("navbar").appendChild(btn);
  }
}
