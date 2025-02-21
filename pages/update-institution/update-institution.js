import { KEYS, stateManager } from "../../src/js/stateManager.js";

export async function startUpdateInstitution(institution) {
  document
    .getElementById("add-institution-form")
    .addEventListener("submit", (event) => {
      updateInstitution(event);
    });

  institution = await stateManager.refreshState(
    KEYS.UPDATE_INSTITUTION,
    institution,
  );

  document.getElementById("short_name").value = institution.short_name;
  document.getElementById("name").value = institution.name;
}

export async function updateInstitution(event) {
  event.preventDefault();

  const short_name = document.getElementById("short_name").value;
  const name = document.getElementById("name").value;

  try {
    await fetchAPI(
      "/institutions",
      "PUT",
      {},
      { short_name: short_name, name: name },
    );
  } catch (error) {
    alert(
      `Não foi possível adicionar o instituição. Tente novamente.\n${error}`,
    );
  }
}
