import { fetchAPI } from "../../src/js/utils.js";

export async function startUpdateRole(role) {
  document
    .getElementById("add-role-form")
    .addEventListener("submit", (event) => {
      updateRole(event);
    });

  document.getElementById("last_title").value = role["title"];
  document.getElementById("title").value = role["title"];
}

export async function updateRole(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const last_title = document.getElementById("last_title").value;

  try {
    await fetchAPI(
      "/roles",
      "PUT",
      {},
      { title: title, last_title: last_title },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o cargo. Tente novamente.\n${error}`);
  }
}
