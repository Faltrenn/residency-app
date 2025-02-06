import { updateInstitution } from "../add-institution/add-institution.js";

export async function startUpdateInstitution(institution) {
  document
    .getElementById("add-institution-form")
    .addEventListener("submit", (event) => {
      updateInstitution(event);
    });

  document.getElementById("short_name").value = institution["short_name"];
  document.getElementById("name").value = institution["name"];
}
