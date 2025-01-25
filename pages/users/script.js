import { fetchUsers } from "../../src/js/utils.js";

/**
 * Executa sempre que a pagina users é carregada.
 *
 */
export async function start() {
  const ut = document.getElementById("users-table")
  const data = await fetchUsers();
  data.forEach(element => {
    let tr = document.createElement("tr");
    for (const key in element) {
      let td = document.createElement("td");
      td.textContent = element[key];

      tr.appendChild(td);
    }
    ut.appendChild(tr);
  });
}
