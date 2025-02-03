import { fetchAPI } from "../../src/js/utils.js";
import { token } from "../login/script.js";

export async function addUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const institution = document.getElementById("institution-select").value;
  const role = document.getElementById("role-select").value;
  const pass = document.getElementById("pass").value;

  try {
    await fetchAPI(
      "/users",
      "POST",
      { token: token },
      { name: name, institution: institution, role: role, pass: pass },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o usuário. Tente novamente.\n${error}`);
  }
}

export async function updateUser(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const institution = document.getElementById("institution-select").value;
  const role = document.getElementById("role-select").value;
  console.log(role)
  const pass = document.getElementById("pass").value;

  try {
    await fetchAPI(
      "/users",
      "PUT",
      { token: token },
      { id: id, name: name, institution: institution, role: role, pass: pass },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o usuário. Tente novamente.\n${error}`);
  }
}
