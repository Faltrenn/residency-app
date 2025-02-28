import { fetchAPI } from "../../src/js/utils.js";
import { KEYS, stateManager } from "../../src/js/stateManager.js";

export async function startProcedureForm({ update, data }) {
  if (update) {
    startUpdateProcedure(data);
    return;
  }
  startAddProcedure();
}

export async function startAddProcedure() {
  document.getElementById("procedure-form").addEventListener("submit", addProcedure);
}

export async function addProcedure(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;

  try {
    await fetchAPI("/procedures", "POST", {}, { title: title });
  } catch (error) {
    alert(`Não foi possível adicionar o cargo. Tente novamente.\n${error}`);
  }
}

export async function startUpdateProcedure(procedure) {
  procedure = await stateManager.refreshState(KEYS.UPDATE_PROCEDURE, procedure);

  document.getElementById("procedure-form").addEventListener("submit", (event) => {
    updateProcedure(event, procedure.title);
  });


  document.getElementById("title").value = procedure.title;
}

export async function updateProcedure(event, lastTitle) {
  event.preventDefault();

  const title = document.getElementById("title").value;

  try {
    await fetchAPI(
      "/procedures",
      "PUT",
      {},
      { last_title: lastTitle, title: title },
    );
  } catch (error) {
    alert(`Não foi possível adicionar o cargo. Tente novamente.\n${error}`);
  }
}
