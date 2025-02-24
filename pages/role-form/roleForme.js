import { fetchAPI } from "../../src/js/utils.js";
import { KEYS, stateManager } from "../../src/js/stateManager.js";

export async function startRoleForm({ update, data }) {
  if (update) {
    startUpdateRole(data);
    return;
  }
  startAddRole();
}

export async function startAddRole() {
  document.getElementById("role-form").addEventListener("submit", addRole);
}

export async function addRole(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;

  try {
    await fetchAPI("/roles", "POST", {}, { title: title });
  } catch (error) {
    alert(`Não foi possível adicionar o cargo. Tente novamente.\n${error}`);
  }
}

export async function startUpdateRole(role) {
  role = await stateManager.refreshState(KEYS.UPDATE_ROLE, role);

  document.getElementById("role-form").addEventListener("submit", (event) => {
    updateRole(event, role.title);
  });

  document.getElementById("title").value = role.title;
}

export async function updateRole(event, lastTitle) {
  event.preventDefault();

  const title = document.getElementById("title").value;

  try {
    await fetchAPI(
      "/roles",
      "PUT",
      {},
      { last_title: lastTitle, title: title },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o cargo. Tente novamente.\n${error}`);
  }
}
