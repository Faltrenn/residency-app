import { fetchAPI, fetchQuestions, fetchUsers } from "../../src/js/utils.js";
import { token } from "../login/login.js";

export async function startUpdateQuestionnaire(questionnaire) {
  document
    .getElementById("update-questionnaire-form")
    .addEventListener("submit", (event) => {
      updateQuestionnaire(event);
    });

  document.getElementById("id").value = questionnaire["id"];

  const users = await fetchUsers();

  const professorSelect = document.getElementById("professor-select");
  users.forEach((user) => {
    if (user["role"] == "Professor") {
      const o = document.createElement("option");
      o.innerText = user["name"];
      o.value = user["id"];
      professorSelect.appendChild(o);
    }
  });

  professorSelect.value = questionnaire["professor"]["id"];

  const residentSelect = document.getElementById("resident-select");
  users.forEach((user) => {
    if (user["role"] == "Residente") {
      const o = document.createElement("option");
      o.innerText = user["name"];
      o.value = user["id"];
      residentSelect.appendChild(o);
    }
  });

  residentSelect.value = questionnaire["resident"]["id"];

  const questions = document.getElementById("questions");
  const qts = await fetchQuestions();
  questionnaire["questions_answereds"].forEach((qt) => {
    let label = document.createElement("label");
    label.setAttribute("for", qt["id"]);
    label.textContent = qt["title"] + ": ";
    let select = document.createElement("select");
    select.setAttribute("name", qt["id"]);
    qts.forEach((q) => {
      if (qt["id"] == q["id"]) {
        q["answers"].forEach((a) => {
          let option = document.createElement("option");
          option.setAttribute("value", a["id"]);
          option.textContent = a["title"];
          select.appendChild(option);
        });
      }
    });
    select.value = qt["answer"]["id"];
    questions.appendChild(label);
    questions.appendChild(select);
    questions.appendChild(document.createElement("br"));
  });
}

export async function updateQuestionnaire(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const professor_id = document.getElementById("professor-select").value;
  const resident_id = document.getElementById("resident-select").value;
  const options = document.querySelectorAll("#questions > select");

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
