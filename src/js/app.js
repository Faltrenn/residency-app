import { startAddInstitution } from "../../pages/add-institution/add-institution.js";
import { startAddQuestion } from "../../pages/add-question/add-question.js";
import { startAddQuestionnaire } from "../../pages/add-questionnaire/add-questionnaire.js";
import { startAddRole } from "../../pages/add-role/add-role.js";
import { startAddUser } from "../../pages/add-user/add-user.js";
import { startFormUser } from "../../pages/form-user/formUser.js";
import { startInstitutionForm } from "../../pages/institution-form/institutionForm.js";
import { institutionsStart } from "../../pages/institutions/institutions.js";
import { logout, startLogin } from "../../pages/login/login.js";
import { startProcedureForm } from "../../pages/procedure-form/procedureForm.js";
import { proceduresStart } from "../../pages/procedures/procedures.js";
import { startQuestionForm } from "../../pages/question-form/questionForm.js";
import { startQuestionnaireForm } from "../../pages/questionnaire-form/questionnaireForm.js";
import { questionnairesStart } from "../../pages/questionnaires/questionnaires.js";
import { questionsStart } from "../../pages/questions/questions.js";
import { startRoleForm } from "../../pages/role-form/roleForme.js";
import { rolesStart } from "../../pages/roles/roles.js";
import { startUpdateInstitution } from "../../pages/update-institution/update-institution.js";
import { startUpdateQuestion } from "../../pages/update-question/update-question.js";
import { startUpdateQuestionnaire } from "../../pages/update-questionnaire/update-questionnaire.js";
import { startUpdateRole } from "../../pages/update-role/update-role.js";
import { startUpdateUser } from "../../pages/update-user/update-user.js";
import { start } from "../../pages/users/users.js";
import { navigate, registerRoute } from "./router.js";
import { setLinksLogic } from "./utils.js";

export const ROLES_PATH = {
  ADMIN: "/Admin",
  PROFESSOR: "/Professor",
  RESIDENT: "/Residente",
};

export const pageTitle = document.getElementById("page-title");

// [[path, callback, filePath]...]
// path é o caminho da rota
// callback é executado assim que a página carregar
// filepath é o caminho do html a ser carregado
const ROUTES = [
  ["/login", startLogin, "pages/login/login.html", null],
  [ROLES_PATH.ADMIN, null, "pages/admin/admin.html", "Página do Administrador"],
  [
    ROLES_PATH.PROFESSOR,
    null,
    "pages/professor/professor.html",
    "Página do Professor",
  ],
  [
    ROLES_PATH.RESIDENT,
    null,
    "pages/resident/resident.html",
    "Página do Residente",
  ],
  ["/users", start, "pages/users/users.html", "Usuários"],
  [
    "/addUser",
    (data) => startFormUser({ update: false, data: data }),
    "pages/form-user/formUser.html",
    "Adicinar Usuário",
  ],
  [
    "/updateUser",
    (data) => startFormUser({ update: true, data: data }),
    "pages/form-user/formUser.html",
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
    (data) => {
      startInstitutionForm({ update: false, data: data });
    },
    "pages/institution-form/institutionForm.html",
    "Criar Instituição",
  ],
  [
    "/update-institution",
    (data) => {
      startInstitutionForm({ update: true, data: data });
    },
    "pages/institution-form/institutionForm.html",
    "Atualizar Instituição",
  ],
  ["/roles", rolesStart, "pages/roles/roles.html", "Cargos"],
  [
    "/add-role",
    (data) => {
      startRoleForm({ update: false, data: data });
    },
    "pages/role-form/roleForm.html",
    "Criar Cargo",
  ],
  [
    "/update-role",
    (data) => {
      startRoleForm({ update: true, data: data });
    },
    "pages/role-form/roleForm.html",
    "Atualizar Cargo",
  ],
  ["/questions", questionsStart, "pages/questions/questions.html", "Perguntas"],
  [
    "/add-question",
    (data) => {
      startQuestionForm({ update: false, data: data });
    },
    "pages/question-form/questionForm.html",
    "Criar Pergunta",
  ],
  [
    "/update-question",
    (data) => {
      startQuestionForm({ update: true, data: data });
    },
    "pages/question-form/questionForm.html",
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
    (data) => {
      startQuestionnaireForm({ update: false, data: data });
    },
    "pages/questionnaire-form/questionnaireForm.html",
    "Criar Avaliação",
  ],
  [
    "/update-questionnaire",
    (data) => {
      startQuestionnaireForm({ update: true, data: data });
    },
    "pages/questionnaire-form/questionnaireForm.html",
    "Atualizar Avaliação",
  ],
  [
    "/procedures",
    proceduresStart,
    "pages/procedures/procedures.html",
    "Procedimentos",
  ],
  [
    "/add-procedure",
    (data) => {
      startProcedureForm({ update: false, data: data });
    },
    "pages/procedure-form/procedureForm.html",
    "Criar Procedimento",
  ],
  [
    "/update-procedure",
    (data) => {
      startProcedureForm({ update: true, data: data });
    },
    "pages/procedure-form/procedureForm.html",
    "Atualizar Procedimento",
  ],
];

// Registrar todas as rotas antes de qualquer coisa.
ROUTES.forEach((r) => registerRoute(...r));

export const logoutButton = document.getElementById("btn-logout");
logoutButton.addEventListener("click", () => {
  logout();
});

export const initialHistoryLength = history.length;
export const backButton = document.getElementById("back");

backButton.onclick = () => {
  history.back();
};

navigate(window.location.pathname);

setLinksLogic("main", (path) => {
  navigate(path);
});

window.addEventListener("popstate", function() {
  navigate(window.location.pathname, null, true);
});
