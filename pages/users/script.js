import { token } from "../login/script.js";

/**
 * Executa sempre que a pagina users é carregada.
 *
 */
export async function start() {
  const response = await fetch("http://localhost:8000/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  if (!response.ok) {
    alert("Errado!");
    return;
  }
  const data = await response.json();

  const ut = document.getElementById("users-table")
  for (const element of data) {
    ut.innerHTML += `<tr><td>${element["id"]}</td><td>${element.name}</td><td>${element.institution}</td><td>${element.role}</td><td>${element.pass}</td></tr>`;
  }
}
