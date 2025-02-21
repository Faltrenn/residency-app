import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchInstitutions } from "../../src/js/utils.js";

let runned = false;
let users = [];

function showTable(table, data) {
  table.getElementsByTagName("tbody")[0].remove();
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  data.forEach((element) => {
    let tr = document.createElement("tr");
    const keys = ["short_name", "name"];
    for (const key of keys) {
      let td = document.createElement("td");
      td.textContent = element[key];

      tr.appendChild(td);
    }

    let btnContainer = document.createElement("div");
    btnContainer.className = "crud-button-container";
    let btn = document.createElement("button");
    btn.onclick = () => {
      deleteInstitution(element["short_name"]);
    };
    btn.textContent = "DEL";
    btn.className = "small-button button-delete";
    btnContainer.appendChild(btn);

    let btn2 = document.createElement("button");
    btn2.onclick = () => {
      navigate("/update-institution", "app", element);
    };
    btn2.textContent = "UPD";
    btn2.className = "small-button button-update";
    btnContainer.appendChild(btn2);

    const td = document.createElement("td");
    td.appendChild(btnContainer);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
}

/**
 * Executa sempre que a pagina users é carregada.
 *
 */
export async function institutionsStart() {
  const tb = document.getElementById("institutions-table");
  if (!runned) {
    const search = document.getElementById("search");
    search.addEventListener("input", (event) => {
      const text = event.target.value;
      let sInstitutions = [];
      users.forEach((element) => {
        if (element["name"].includes(text)) sInstitutions.push(element);
      });

      showTable(tb, sInstitutions);
    });
    runned = true;
  }
  users = await fetchInstitutions();
  showTable(tb, users);
}

export async function deleteInstitution(short_name) {
  await fetchAPI("/institutions", "DELETE", {}, { short_name: short_name });
  await institutionsStart();
}
