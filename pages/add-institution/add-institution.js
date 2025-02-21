import { fetchAPI } from "../../src/js/utils.js";

export async function startAddInstitution() {
  document
    .getElementById("add-institution-form")
    .addEventListener("submit", (event) => {
      addInstitution(event);
    });
}

export async function addInstitution(event) {
  event.preventDefault();

  const short_name = document.getElementById("short_name").value;
  const name = document.getElementById("name").value;

  try {
    await fetchAPI(
      "/institutions",
      "POST",
      {},
      { short_name: short_name, name: name },
    );
  } catch (error) {
    alert(
      `Não foi possível adicionar o instituição. Tente novamente.\n${error}`,
    );
  }
}

