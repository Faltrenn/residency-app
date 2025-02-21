import { fetchAPI, fetchInstitutions, fetchRoles } from "../../src/js/utils.js";
import { token } from "../login/login.js";
import { KEYS, stateManager } from "../../src/js/stateManager.js";

export async function startFormUser({ update, data }) {
  if (update) {
    startUpdateUser(data);
    return;
  }
  startAddUser();
}

export async function startAddUser() {
  document.getElementById("form-user").addEventListener("submit", (event) => {
    addUser(event);
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
}

export async function startUpdateUser(user) {
  document.getElementById("form-user").addEventListener("submit", (event) => {
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

  user = await stateManager.refreshState(KEYS.UPDATE_USER, user);

  document.getElementById("id").value = user.id;
  document.getElementById("name").value = user.name;
  document.getElementById("institution-select").value = user.institution;
  document.getElementById("role-select").value = user.role;
  document.getElementById("pass").value = user.pass;
}

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
