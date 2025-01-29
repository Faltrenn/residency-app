import { fetchAPI, fetchUsers } from "../../src/js/utils.js";

/**
 * Executa sempre que a pagina users é carregada.
 *
 */
export async function start() {
  const ut = document.getElementById("users-table");
  ut.getElementsByTagName("tbody")[0]?.remove();
  const tbody = document.createElement("tbody");
  ut.appendChild(tbody);

  let data = await fetchUsers();
  data.forEach((element) => {
    let tr = document.createElement("tr");
    const keys = ["id", "name", "institution", "role", "pass"];
    for (const key of keys) {
      let td = document.createElement("td");
      td.textContent = element[key];

      tr.appendChild(td);
    }

    let td = document.createElement("td");
    let btn = document.createElement("button");
    btn.onclick = () => {
      deleteUser(element["id"]);
    };
    btn.textContent = "DEL";
    td.appendChild(btn);
    tr.classList.add("tdata");

    tr.appendChild(td);
    tbody.appendChild(tr);
  });
}

export async function deleteUser(id) {
  await fetchAPI("/users", "DELETE", {}, { id: id });
  await start();
}
