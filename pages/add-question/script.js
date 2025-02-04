import { fetchAPI } from "../../src/js/utils.js";

export async function addQuestion(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const institution = document.getElementById("institution-select").value;
  const role = document.getElementById("role-select").value;
  const pass = document.getElementById("pass").value;

  try {
    await fetchAPI(
      "/questions",
      "POST",
      { token: token },
      { name: name, institution: institution, role: role, pass: pass },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o usuário. Tente novamente.\n${error}`);
  }
}

export async function updateQuestion(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const institution = document.getElementById("institution-select").value;
  const role = document.getElementById("role-select").value;
  const pass = document.getElementById("pass").value;

  try {
    await fetchAPI(
      "/questions",
      "PUT",
      { token: token },
      { id: id, name: name, institution: institution, role: role, pass: pass },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o usuário. Tente novamente.\n${error}`);
  }
}
