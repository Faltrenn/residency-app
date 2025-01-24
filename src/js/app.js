import { addLogoutButtonIfNotExists, login } from "../../pages/login/script.js";
import { start } from "../../pages/users/script.js";
import { navigate, registerRoute } from "./router.js";
import { setLinksLogic } from "./utils.js";

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
];

// Registrar todas as rotas antes de qualquer coisa.
ROUTES.forEach((r) => registerRoute(...r));

navigate(window.location.pathname, "app");

setLinksLogic("main", (path) => {
  navigate(path, "app");
});

addLogoutButtonIfNotExists();
