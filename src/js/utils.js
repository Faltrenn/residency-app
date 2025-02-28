import { token } from "../../pages/login/login.js";

/**
 * Define o que vai ser executado quando um <a> for clicaco
 * @param {string} elementID - Onde estarão os links(<a>).
 * @param {function} logic - O que será executado.
 **/
export function setLinksLogic(elementID, logic) {
  document.getElementById(elementID).addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && link.getAttribute("href")) {
      event.preventDefault();
      const path = link.getAttribute("href");
      logic(path);
    }
  });
}

/**
 * Faz uma requisição e executa um callback passando response e data como parametros.
 *
 * @async
 * @param {string} path - Endpoint da api (ex: login/check)
 * @param {string} method - Método da requisição (ex: POST)
 * @param {object} headers - Headers da requisição.O
 * @param {object} body - Campos a serem enviados no body.
 * @throws {Error} - Caso codigo sera diferente de 2xx, erro.
 * @returns {Promise<object>}
 */
export async function fetchAPI(path, method, headers, body) {
  const response = await fetch(`http://localhost:8000${path}`, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      token: token,
      ...headers,
    },
    ...((body && method.toUpperCase() != "GET") ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    // Erro se a resposta não for um status 2xx
    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
  }

  if ((response.headers.get("Content-Type") || "") == "application/json")
    return await response.json();
}

/**
 * Pega os usuários da api e retorna um object com eles.
 *
 * @async
 * @returns {Promise<object>} - Objetos com os usuários resgatados.
 */
export const fetchUsers = async () => {
  return await fetchAPI("/users", "get", { token: token });
};
export const fetchInstitutions = async () => {
  return await fetchAPI("/institutions", "get", { token: token });
};
export const fetchRoles = async () => {
  return await fetchAPI("/roles", "get", { token: token });
};
export const fetchQuestions = async () => {
  return await fetchAPI("/questions", "get", { token: token });
};
export const fetchQuestionnaires = async () => {
  return await fetchAPI("/questionnaires", "get", { token: token });
};
export const fetchProcedures = async () => {
  return await fetchAPI("/procedures", "get", { token: token });
};

export const fetchUser = async (id) => {
  const users = await fetchUsers();
  let user = null;
  users.forEach((item) => {
    if (item.id == id) user = item;
  });
  return user;
};

export const fetchRole = async (id) => {
  const roles = await fetchRoles();
  let role = null;
  roles.forEach((item) => {
    if (item.title == id) role = item;
  });
  return role;
};

export const fetchInstitution = async (id) => {
  const institutions = await fetchInstitutions();
  let institution = null;
  institutions.forEach((item) => {
    if (item.short_name == id) institution = item;
  });
  return institution;
};

export const fetchQuestion = async (id) => {
  const questions = await fetchQuestions();
  let question = null;
  questions.forEach((item) => {
    if (item.id == id) question = item;
  });
  return question;
};

export const fetchQuestionnaire = async (id) => {
  const questionnaires = await fetchQuestionnaires();
  let questionnaire = null;
  questionnaires.forEach((item) => {
    if (item.id == id) questionnaire = item;
  });
  return questionnaire;
};

export const fetchProcedure = async (title) => {
  const procedures = await fetchProcedures();
  let procedure = null;
  procedures.forEach((item) => {
    if (item.title == title) procedure = item;
  });
  return procedure;
};
