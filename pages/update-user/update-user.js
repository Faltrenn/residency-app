import { KEYS, stateManager } from "../../src/js/stateManager.js";
import {
  fetchAPI,
  fetchInstitutions,
  fetchRoles,
} from "../../src/js/utils.js";

export async function startUpdateUser(user) {
  document
    .getElementById("add-user-form")
    .addEventListener("submit", (event) => {
      updateUser(event);
    });

  const roles = await fetchRoles();

  const rolesSelect = document.getElementById("role-select");
  roles.forEach((role) => {
    const o = document.createElement("option");
    o.innerText = role["title"];
    o.value = role["title"];
    rolesSelect.appendChild(o);
  });

  const institutions = await fetchInstitutions();

  const institutionSelect = document.getElementById("institution-select");
  institutions.forEach((institution) => {
    const o = document.createElement("option");
    o.innerText = `${institution["short_name"]} - ${institution["name"]}`;
    o.value = institution["short_name"];
    institutionSelect.appendChild(o);
  });


  user = await stateManager.refreshState(KEYS.USER, user)
  console.log(user)

  document.getElementById("id").value = user.id;
  document.getElementById("name").value = user.name;
  document.getElementById("institution-select").value = user.institution;
  document.getElementById("role-select").value = user.role;
  document.getElementById("pass").value = user.pass;
}

export async function updateUser(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const institution = document.getElementById("institution-select").value;
  const role = document.getElementById("role-select").value;
  const pass = document.getElementById("pass").value;

  try {
    await fetchAPI(
      "/users",
      "PUT",
      {},
      { id: id, name: name, institution: institution, role: role, pass: pass },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o usuário. Tente novamente.\n${error}`);
  }
}
