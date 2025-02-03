import { addUser, updateUser } from "../../pages/add-user/script.js";
import { login, token } from "../../pages/login/script.js";
import { start } from "../../pages/users/script.js";
import { navigate, navigateBackwards, registerRoute } from "./router.js";
import { fetchAPI, setLinksLogic } from "./utils.js";

export const ROLES_PATH = {
  ADMIN: "/Admin",
  PROFESSOR: "/Professor",
  RESIDENT: "/Resident",
};

// [[path, callback, filePath]...]
// path é o caminho da rota
// callback é executado assim que a página carregar
// filepath é o caminho do html a ser carregado
const ROUTES = [
  [
    "/login",
    () => {
      document.getElementById("btn-logout")?.remove();

      document
        .getElementById("login-form")
        .addEventListener("submit", (event) => {
          login(event);
        });
    },
    "pages/login/index.html",
  ],
  ["/users", start, "pages/users/index.html"],
  [ROLES_PATH.ADMIN, null, "pages/admin/index.html"],
  [
    "/add-user",
    async () => {
      document
        .getElementById("add-user-form")
        .addEventListener("submit", (event) => {
          addUser(event);
        });

      const roles = await fetchAPI("/roles", "GET", { token: token }, null);

      const rolesSelect = document.getElementById("role-select");
      roles.forEach((role) => {
        const o = document.createElement("option");
        o.innerText = role["title"];
        o.value = role["title"];
        rolesSelect.appendChild(o);
      });

      const institutions = await fetchAPI(
        "/institutions",
        "GET",
        { token: token },
        null,
      );

      const institutionSelect = document.getElementById("institution-select");
      institutions.forEach((institution) => {
        const o = document.createElement("option");
        o.innerText = `${institution["short_name"]} - ${institution["name"]}`;
        o.value = institution["short_name"];
        institutionSelect.appendChild(o);
      });
    },
    "pages/add-user/index.html",
  ],
  [
    "/update-user",
    async (user) => {
      document
        .getElementById("add-user-form")
        .addEventListener("submit", (event) => {
          updateUser(event);
        });

      const roles = await fetchAPI("/roles", "GET", { token: token }, null);

      const rolesSelect = document.getElementById("role-select");
      roles.forEach((role) => {
        const o = document.createElement("option");
        o.innerText = role["title"];
        o.value = role["title"];
        rolesSelect.appendChild(o);
      });

      const institutions = await fetchAPI(
        "/institutions",
        "GET",
        { token: token },
        null,
      );

      const institutionSelect = document.getElementById("institution-select");
      institutions.forEach((institution) => {
        const o = document.createElement("option");
        o.innerText = `${institution["short_name"]} - ${institution["name"]}`;
        o.value = institution["short_name"];
        institutionSelect.appendChild(o);
      });

      document.getElementById("id").value = user["id"];
      document.getElementById("name").value = user["name"];
      document.getElementById("institution-select").value = user["institution"];
      document.getElementById("role-select").value = user["role"];
      console.log(user["role"])
      document.getElementById("pass").value = user["pass"];
    },
    "pages/update-user/index.html",
  ],
];

// Registrar todas as rotas antes de qualquer coisa.
ROUTES.forEach((r) => registerRoute(...r));

navigate(window.location.pathname, "app");

setLinksLogic("main", (path) => {
  navigate(path, "app");
});

window.addEventListener("popstate", function() {
  navigateBackwards();
});
