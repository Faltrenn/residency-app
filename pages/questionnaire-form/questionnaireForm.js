import { fetchAPI, fetchQuestions, fetchUsers } from "../../src/js/utils.js";
import { KEYS, stateManager } from "../../src/js/stateManager.js";
import { token } from "../login/login.js";

export async function startQuestionnaireForm({ update, data }) {
  if (update) {
    startUpdateQuestionnaire(data);
    return;
  }
  startAddQuestionnaire();
}

export async function startAddQuestionnaire() {
  document
    .getElementById("questionnaire-form")
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
    const div = document.createElement("div");
    div.className = "form-group";
    let label = document.createElement("label");
    label.setAttribute("for", qt["id"]);
    label.textContent = qt["title"] + ": ";
    let select = document.createElement("select");
    select.setAttribute("name", qt["id"]);
    select.className = "input-field";
    qt["answers"].forEach((a) => {
      let option = document.createElement("option");
      option.setAttribute("value", a["id"]);
      option.textContent = a["title"];
      select.appendChild(option);
    });
    div.appendChild(label);
    div.appendChild(select);
    questions.appendChild(div);
  });
}

export async function addQuestionnaire(event) {
  event.preventDefault();

  const professor_id = document.getElementById("professor-select").value;
  const resident_id = document.getElementById("resident-select").value;
  const options = document.querySelectorAll(
    "#questions > .form-group > select",
  );

  let questions_answereds = [];
  options.forEach((input) => {
    questions_answereds.push({
      question_id: input.getAttribute("name"),
      answer_id: input.value,
    });
  });

  try {
    await fetchAPI(
      "/questionnaires",
      "POST",
      { token: token },
      {
        professor_id: professor_id,
        resident_id: resident_id,
        questions_answereds: questions_answereds,
      },
    );
  } catch (error) {
    alert(
      `Não foi possível adicionar o questionário. Tente novamente.\n${error}`,
    );
  }
}

export async function startUpdateQuestionnaire(questionnaire) {
  document
    .getElementById("questionnaire-form")
    .addEventListener("submit", (event) => {
      updateQuestionnaire(event, questionnaire.id);
    });

  questionnaire = await stateManager.refreshState(
    KEYS.UPDATE_QUESTIONNAIRE,
    questionnaire,
  );

  const users = await fetchUsers();

  const professorSelect = document.getElementById("professor-select");
  users.forEach((user) => {
    if (user.role == "Professor") {
      const o = document.createElement("option");
      o.innerText = user.name;
      o.value = user.id;
      professorSelect.appendChild(o);
    }
  });

  professorSelect.value = questionnaire.professor.id;

  const residentSelect = document.getElementById("resident-select");
  users.forEach((user) => {
    if (user.role == "Residente") {
      const o = document.createElement("option");
      o.innerText = user.name;
      o.value = user.id;
      residentSelect.appendChild(o);
    }
  });

  residentSelect.value = questionnaire.resident.id;

  const questions = document.getElementById("questions");
  const qts = await fetchQuestions();
  questionnaire.questions_answereds.forEach((qt) => {
    let div = document.createElement("div");
    div.className = "form-group";
    let label = document.createElement("label");
    label.setAttribute("for", qt.id);
    label.textContent = qt.title + ": ";
    let select = document.createElement("select");
    select.className = "input-field";
    select.setAttribute("name", qt.id);
    qts.forEach((q) => {
      if (qt.id == q.id) {
        q.answers.forEach((a) => {
          let option = document.createElement("option");
          option.setAttribute("value", a.id);
          option.textContent = a.title;
          select.appendChild(option);
        });
      }
    });
    select.value = qt.answer.id;
    div.appendChild(label);
    div.appendChild(select);
    questions.appendChild(div);
  });
}

export async function updateQuestionnaire(event, id) {
  event.preventDefault();

  const professor_id = document.getElementById("professor-select").value;
  const resident_id = document.getElementById("resident-select").value;
  const options = document.querySelectorAll("#questions > .form-group > select");

  let questions_answereds = [];
  options.forEach((input) => {
    questions_answereds.push({
      question_id: input.getAttribute("name"),
      answer_id: input.value,
    });
  });

  try {
    await fetchAPI(
      "/questionnaires",
      "PUT",
      { token: token },
      {
        id: id,
        professor_id: professor_id,
        resident_id: resident_id,
        questions_answereds: questions_answereds,
      },
    );
  } catch (error) {
    alert(`Não foi possível editar o questionário. Tente novamente.\n${error}`);
  }
}
