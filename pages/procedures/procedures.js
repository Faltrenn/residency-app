import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchProcedures, fetchRoles } from "../../src/js/utils.js";

let runned = false;
let procedures = [];

function showTable(table, data) {
  table.getElementsByTagName("tbody")[0].remove();
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  data.forEach((element) => {
    let tr = document.createElement("tr");
    const keys = ["title"];
    for (const key of keys) {
      let td = document.createElement("td");
      td.textContent = element[key];

      tr.appendChild(td);
    }

    const btnContainer = document.createElement("div");
    btnContainer.className = "crud-button-container";

    let btn = document.createElement("button");
    btn.onclick = () => {
      deleteRole(element["title"]);
    };
    btn.textContent = "DEL";
    btn.className = "small-button button-delete";
    btnContainer.appendChild(btn);

    let btn2 = document.createElement("button");
    btn2.onclick = () => {
      navigate("/update-procedure", element);
    };
    btn2.textContent = "UPD";
    btn2.className = "small-button button-update";
    btnContainer.appendChild(btn2);

    let td = document.createElement("td");
    td.appendChild(btnContainer);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
}

/**
 * Executa sempre que a pagina procedures é carregada.
 *
 */
export async function proceduresStart() {
  const tb = document.getElementById("procedures-table");
  if (!runned) {
    const search = document.getElementById("search");
    search.addEventListener("input", (event) => {
      const text = event.target.value;
      if (text !== "") {
        let sRoles = [];
        procedures.forEach((element) => {
          if (element["title"].includes(text)) sRoles.push(element);
        });
        showTable(tb, sRoles);
        return;
      }

      showTable(tb, procedures);
    });
    runned = true;
  }
  procedures = await fetchProcedures();
  showTable(tb, procedures);
}

export async function deleteRole(title) {
  await fetchAPI("/procedures", "DELETE", {}, { title: title });
  await proceduresStart();
}
