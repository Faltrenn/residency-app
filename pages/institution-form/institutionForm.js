import { fetchAPI } from "../../src/js/utils.js";
import { KEYS, stateManager } from "../../src/js/stateManager.js";

export async function startInstitutionForm({ update, data }) {
  if (update) {
    startUpdateInstitution(data);
    return;
  }
  startAddInstitution();
}

export async function startAddInstitution() {
  document
    .getElementById("institution-form")
    .addEventListener("submit", (event) => {
      addInstitution(event);
    });
}

export async function startUpdateInstitution(institution) {
  document
    .getElementById("institution-form")
    .addEventListener("submit", (event) => {
      updateInstitution(event, institution.short_name);
    });

  institution = await stateManager.refreshState(
    KEYS.UPDATE_INSTITUTION,
    institution,
  );

  document.getElementById("short-name").value = institution.short_name;
  document.getElementById("name").value = institution.name;
}

export async function addInstitution(event) {
  event.preventDefault();

  const shortName = document.getElementById("short-name").value;
  const name = document.getElementById("name").value;

  try {
    await fetchAPI(
      "/institutions",
      "POST",
      {},
      { short_name: shortName, name: name },
    );
  } catch (error) {
    alert(
      `Não foi possível adicionar o instituição. Tente novamente.\n${error}`,
    );
  }
}

export async function updateInstitution(event, id) {
  event.preventDefault();

  const shortName = document.getElementById("short-name").value;
  const name = document.getElementById("name").value;

  try {
    await fetchAPI(
      "/institutions",
      "PUT",
      {},
      { last_short_name: id, short_name: shortName, name: name },
    );
  } catch (error) {
    alert(
      `Não foi possível adicionar o instituição. Tente novamente.\n${error}`,
    );
  }
}
