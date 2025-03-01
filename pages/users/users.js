import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchUsers } from "../../src/js/utils.js";
import { role } from "../login/login.js";

let runned = false;
let users = [];

function showTable(table, data) {
  table.getElementsByTagName("tbody")[0].remove();
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  data.forEach((element) => {
    let tr = document.createElement("tr");
    tr.classList.add("tdata");
    const keys = ["name", "institution", "role"];
    for (const key of keys) {
      let td = document.createElement("td");
      td.textContent = element[key];

      tr.appendChild(td);
    }

    if (role == "Admin") {
      const btnContainer = document.createElement("div");
      btnContainer.className = "crud-button-container";
      let btn = document.createElement("button");
      btn.onclick = () => {
        deleteUser(element["id"]);
      };
      btn.textContent = "DEL";
      btn.className = "small-button button-delete";
      btnContainer.appendChild(btn);

      let btn2 = document.createElement("button");
      btn2.onclick = () => {
        navigate("/updateUser", element);
      };
      btn2.textContent = "UPD";
      btn2.className = "small-button button-update";
      btnContainer.appendChild(btn2);

      const td = document.createElement("td");
      td.appendChild(btnContainer);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
}
/**
 * Executa sempre que a pagina users é carregada.
 *
 */
export async function start() {
  const tb = document.getElementById("users-table");
  if (!runned) {
    const search = document.getElementById("search");
    search.addEventListener("input", (event) => {
      const text = event.target.value;
      let sUsers = [];
      users.forEach((element) => {
        if (element["name"].includes(text)) sUsers.push(element);
      });

      showTable(tb, sUsers);
    });

    document.getElementById("add-user").remove();
    document.querySelector("table > thead > tr > th:last-child").remove();

    runned = true;
  }
  users = await fetchUsers();
  showTable(tb, users);
}

export async function deleteUser(id) {
  await fetchAPI("/users", "DELETE", {}, { id: id });
  await start();
}
