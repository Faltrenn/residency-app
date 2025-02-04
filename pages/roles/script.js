import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchRoles} from "../../src/js/utils.js";

let runned = false;
let users = [];

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

    let td = document.createElement("td");
    let btn = document.createElement("button");
    btn.onclick = () => {
      deleteRole(element["title"]);
    };
    btn.textContent = "DEL";
    td.appendChild(btn);
    tr.classList.add("tdata");

    let td2 = document.createElement("td");
    let btn2 = document.createElement("button");
    btn2.onclick = () => {
      navigate("/update-role", "app", element);
    };
    btn2.textContent = "UPD";
    td2.appendChild(btn2);

    tr.appendChild(td);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  });
}

/**
 * Executa sempre que a pagina users é carregada.
 *
 */
export async function rolesStart() {
  const tb = document.getElementById("roles-table");
  if (!runned) {
    const search = document.getElementById("search");
    search.addEventListener("input", (event) => {
      const text = event.target.value;
      let sRoles = [];
      users.forEach((element) => {
        if (element["title"].includes(text)) sRoles.push(element);
      });

      showTable(tb, sRoles);
    });
    runned = true;
  }
  users = await fetchRoles();
  showTable(tb, users);
}

export async function deleteRole(title) {
  await fetchAPI("/roles", "DELETE", {}, { title: title });
  await rolesStart();
}
