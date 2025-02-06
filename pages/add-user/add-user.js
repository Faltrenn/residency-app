import { fetchAPI } from "../../src/js/utils.js";
import { token } from "../login/login.js";

export async function startAddUser() {
  document
    .getElementById("add-user-form")
    .addEventListener("submit", (event) => {
      addUser(event);
    });

  const roles = await fetchAPI("/roles", "GET", { token: token }, null);

  const rolesSelect = document.getElementById("role-select");
  roles.forEach((role) => {
    const o = document.createElement("option");
    o.innerText = role["title"];
    o.value = role["title"];
    rolesSelect.appendChild(o);
  });

  const institutions = await fetchAPI(
    "/institutions",
    "GET",
    { token: token },
    null,
  );

  const institutionSelect = document.getElementById("institution-select");
  institutions.forEach((institution) => {
    const o = document.createElement("option");
    o.innerText = `${institution["short_name"]} - ${institution["name"]}`;
    o.value = institution["short_name"];
    institutionSelect.appendChild(o);
  });
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

