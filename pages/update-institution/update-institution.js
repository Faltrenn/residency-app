import { KEYS, stateManager } from "../../src/js/stateManager.js";
import { updateInstitution } from "../add-institution/add-institution.js";

export async function startUpdateInstitution(institution) {
  document
    .getElementById("add-institution-form")
    .addEventListener("submit", (event) => {
      updateInstitution(event);
    });

  institution = await stateManager.refreshState(KEYS.UPDATE_INSTITUTION, institution)

  document.getElementById("short_name").value = institution.short_name;
  document.getElementById("name").value = institution.name;
}
