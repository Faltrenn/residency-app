import {
  addInstitution,
  updateInstitution,
} from "../../pages/add-institution/script.js";
import {
  addAnswer,
  addQuestion,
  updateQuestion,
} from "../../pages/add-question/script.js";
import { addQuestionnaire } from "../../pages/add-questionnaire/script.js";
import { addRole, updateRole } from "../../pages/add-role/script.js";
import { addUser, updateUser } from "../../pages/add-user/script.js";
import { institutionsStart } from "../../pages/institutions/script.js";
import { login, token } from "../../pages/login/script.js";
import { questionnairesStart } from "../../pages/questionnaires/script.js";
import { questionsStart } from "../../pages/questions/script.js";
import { rolesStart } from "../../pages/roles/script.js";
import { start } from "../../pages/users/script.js";
import { navigate, navigateBackwards, registerRoute } from "./router.js";
import {
  fetchAPI,
  fetchQuestionnaires,
  fetchQuestions,
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
      document.getElementById("pass").value = user["pass"];
    },
    "pages/update-user/index.html",
  ],
  ["/institutions", institutionsStart, "pages/institutions/index.html"],
  [
    "/add-institution",
    async () => {
      document
        .getElementById("add-institution-form")
        .addEventListener("submit", (event) => {
          addInstitution(event);
        });
    },
    "pages/add-institution/index.html",
  ],
  [
    "/update-institution",
    async (institution) => {
      document
        .getElementById("add-institution-form")
        .addEventListener("submit", (event) => {
          updateInstitution(event);
        });

      document.getElementById("short_name").value = institution["short_name"];
      document.getElementById("name").value = institution["name"];
    },
    "pages/update-institution/index.html",
  ],
  ["/roles", rolesStart, "pages/roles/index.html"],
  [
    "/add-role",
    async () => {
      document
        .getElementById("add-role-form")
        .addEventListener("submit", (event) => {
          addRole(event);
        });
    },
    "pages/add-role/index.html",
  ],
  [
    "/update-role",
    async (role) => {
      document
        .getElementById("add-role-form")
        .addEventListener("submit", (event) => {
          updateRole(event);
        });

      document.getElementById("last_title").value = role["title"];
      document.getElementById("title").value = role["title"];
    },
    "pages/update-role/index.html",
  ],
  ["/questions", questionsStart, "pages/questions/index.html"],
  [
    "/add-question",
    async () => {
      document
        .getElementById("add-question-form")
        .addEventListener("submit", (event) => {
          addQuestion(event);
        });
      let aabtn = document.getElementById("add-answer");
      aabtn.onclick = addAnswer;
    },
    "pages/add-question/index.html",
  ],
  [
    "/update-question",
    async (question) => {
      document
        .getElementById("add-question-form")
        .addEventListener("submit", (event) => {
          updateQuestion(event);
        });

      document.getElementById("id").value = question["id"];
      document.getElementById("title").value = question["title"];
      let answersElement = document.getElementById("answers");
      question["answers"].forEach((answer) => {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.value = answer["title"];
        answersElement.appendChild(input);
      });
    },
    "pages/update-question/index.html",
  ],
  ["/questionnaires", questionnairesStart, "pages/questionnaires/index.html"],
  [
    "/add-questionnaire",
    async () => {
      document
        .getElementById("add-questionnaire-form")
        .addEventListener("submit", (event) => {
          addQuestionnaire(event);
        });

      const users = await fetchAPI("/users", "GET", { token: token }, null);

      const professorSelect = document.getElementById("professor-select");
      users.forEach((user) => {
        if (user["role"] == "Professor") {
          const o = document.createElement("option");
          o.innerText = user["name"];
          o.value = user["id"];
          professorSelect.appendChild(o);
        }
      });

      const residentSelect = document.getElementById("resident-select");
      users.forEach((user) => {
        if (user["role"] == "Residente") {
          const o = document.createElement("option");
          o.innerText = user["name"];
          o.value = user["id"];
          residentSelect.appendChild(o);
        }
      });

      const qts = await fetchQuestions();
      const questions = document.getElementById("questions");
      qts.forEach((qt) => {
        let label = document.createElement("label");
        label.setAttribute("for", qt["id"]);
        label.textContent = qt["title"] + ": ";
        let select = document.createElement("select");
        select.setAttribute("name", qt["id"]);
        qt["answers"].forEach((a) => {
          let option = document.createElement("option");
          option.setAttribute("value", a["id"]);
          option.textContent = a["title"];
          select.appendChild(option);
        });
        questions.appendChild(label);
        questions.appendChild(select);
        questions.appendChild(document.createElement("br"));
      });
    },
    "pages/add-questionnaire/index.html",
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
