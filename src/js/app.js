import { startAddInstitution } from "../../pages/add-institution/add-institution.js";
import { startAddQuestion } from "../../pages/add-question/add-question.js";
import { startAddQuestionnaire } from "../../pages/add-questionnaire/add-questionnaire.js";
import { startAddRole } from "../../pages/add-role/add-role.js";
import { startAddUser } from "../../pages/add-user/add-user.js";
import { institutionsStart } from "../../pages/institutions/institutions.js";
import { startLogin } from "../../pages/login/login.js";
import { questionnairesStart } from "../../pages/questionnaires/questionnaires.js";
import { questionsStart } from "../../pages/questions/questions.js";
import { rolesStart } from "../../pages/roles/roles.js";
import { startUpdateInstitution } from "../../pages/update-institution/update-institution.js";
import { startUpdateQuestion } from "../../pages/update-question/update-question.js";
import { startUpdateQuestionnaire } from "../../pages/update-questionnaire/update-questionnaire.js";
import { startUpdateRole } from "../../pages/update-role/update-role.js";
import { startUpdateUser } from "../../pages/update-user/update-user.js";
import { start } from "../../pages/users/users.js";
import { navigate, navigateBackwards, registerRoute } from "./router.js";
import { setLinksLogic } from "./utils.js";

export const ROLES_PATH = {
  ADMIN: "/Admin",
  PROFESSOR: "/Professor",
  RESIDENT: "/Resident",
};

export const pageTitle = document.getElementById("page-title");

// [[path, callback, filePath]...]
// path é o caminho da rota
// callback é executado assim que a página carregar
// filepath é o caminho do html a ser carregado
const ROUTES = [
  ["/login", startLogin, "pages/login/login.html", null],
  ["/users", start, "pages/users/users.html", "Usuários"],
  [ROLES_PATH.ADMIN, null, "pages/admin/admin.html", "Página do Administrador"],
  [
    ROLES_PATH.PROFESSOR,
    null,
    "pages/professor/professor.html",
    "Página do Professor",
  ],
  [
    "/add-user",
    startAddUser,
    "pages/add-user/add-user.html",
    "Criar Usuário",
  ],
  [
    "/update-user",
    startUpdateUser,
    "pages/update-user/update-user.html",
    "Atualizar Usuário",
  ],
  [
    "/institutions",
    institutionsStart,
    "pages/institutions/institutions.html",
    "Instituições",
  ],
  [
    "/add-institution",
    startAddInstitution,
    "pages/add-institution/add-institution.html",
    "Criar Instituição",
  ],
  [
    "/update-institution",
    startUpdateInstitution,
    "pages/update-institution/update-institution.html",
    "Atualizar Instituição",
  ],
  ["/roles", rolesStart, "pages/roles/roles.html", "Cargos"],
  [
    "/add-role",
    startAddRole,
    "pages/add-role/add-role.html",
    "Criar Cargo",
  ],
  [
    "/update-role",
    startUpdateRole,
    "pages/update-role/update-role.html",
    "Atualizar Cargo",
  ],
  ["/questions", questionsStart, "pages/questions/questions.html", "Perguntas"],
  [
    "/add-question",
    startAddQuestion,
    "pages/add-question/add-question.html",
    "Criar Pergunta",
  ],
  [
    "/update-question",
    startUpdateQuestion,
    "pages/update-question/update-question.html",
    "Atualizar Pergunta",
  ],
  [
    "/questionnaires",
    questionnairesStart,
    "pages/questionnaires/questionnaires.html",
    "Avaliações",
  ],
  [
    "/add-questionnaire",
    startAddQuestionnaire,
    "pages/add-questionnaire/add-questionnaire.html",
    "Criar Avaliação",
  ],
  [
    "/update-questionnaire",
    startUpdateQuestionnaire,
    "pages/update-questionnaire/update-questionnaire.html",
    "Atualizar Avaliação",
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
