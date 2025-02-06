import { startAddInstitution } from "../../pages/add-institution/add-institution.js";
import { startAddQuestion } from "../../pages/add-question/add-question.js";
import { startAddQuestionnaire } from "../../pages/add-questionnaire/add-questionnaire.js";
import { startAddRole } from "../../pages/add-role/add-role.js";
import { startAddUser } from "../../pages/add-user/add-user.js";
import { institutionsStart } from "../../pages/institutions/script.js";
import { startLogin } from "../../pages/login/login.js";
import { questionnairesStart } from "../../pages/questionnaires/script.js";
import { questionsStart } from "../../pages/questions/script.js";
import { rolesStart } from "../../pages/roles/script.js";
import { startUpdateInstitution } from "../../pages/update-institution/update-institution.js";
import { startUpdateQuestion } from "../../pages/update-question/update-question.js";
import { startUpdateRole } from "../../pages/update-role/update-role.js";
import { startUpdateUser } from "../../pages/update-user/update-user.js";
import { start } from "../../pages/users/script.js";
import { navigate, navigateBackwards, registerRoute } from "./router.js";
import {
  setLinksLogic,
} from "./utils.js";

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
  ["/login", startLogin, "pages/login/index.html"],
  ["/users", start, "pages/users/index.html"],
  [ROLES_PATH.ADMIN, null, "pages/admin/index.html"],
  ["/add-user", startAddUser, "pages/add-user/index.html"],
  ["/update-user", startUpdateUser, "pages/update-user/index.html"],
  ["/institutions", institutionsStart, "pages/institutions/index.html"],
  ["/add-institution", startAddInstitution, "pages/add-institution/index.html"],
  [
    "/update-institution",
    startUpdateInstitution,
    "pages/update-institution/index.html",
  ],
  ["/roles", rolesStart, "pages/roles/index.html"],
  ["/add-role", startAddRole, "pages/add-role/index.html"],
  ["/update-role", startUpdateRole, "pages/update-role/index.html"],
  ["/questions", questionsStart, "pages/questions/index.html"],
  ["/add-question", startAddQuestion, "pages/add-question/index.html"],
  ["/update-question", startUpdateQuestion, "pages/update-question/index.html"],
  ["/questionnaires", questionnairesStart, "pages/questionnaires/index.html"],
  [
    "/add-questionnaire",
    startAddQuestionnaire,
    "pages/add-questionnaire/index.html",
  ],
  [
    "/update-questionnaire",
    startUpdateQuestion,
    "pages/update-questionnaire/index.html",
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
