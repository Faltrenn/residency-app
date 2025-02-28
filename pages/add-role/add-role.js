import { navigate } from "../../src/js/router.js";
import { fetchAPI } from "../../src/js/utils.js";

export async function startAddRole() {
  document
    .getElementById("add-role-form")
    .addEventListener("submit", (event) => {
      addRole(event);
    });
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
