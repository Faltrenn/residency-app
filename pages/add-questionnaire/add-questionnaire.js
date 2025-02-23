import { fetchAPI, fetchQuestions } from "../../src/js/utils.js";
import { token } from "../login/login.js";

export async function startAddQuestionnaire() {
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
    const div = document.createElement("div")
    div.className = "form-group"
    let label = document.createElement("label");
    label.setAttribute("for", qt["id"]);
    label.textContent = qt["title"] + ": ";
    let select = document.createElement("select");
    select.setAttribute("name", qt["id"]);
    select.className = "input-field"
    qt["answers"].forEach((a) => {
      let option = document.createElement("option");
      option.setAttribute("value", a["id"]);
      option.textContent = a["title"];
      select.appendChild(option);
    });
    div.appendChild(label);
    div.appendChild(select);
    questions.appendChild(div)
  });
}

export async function addQuestionnaire(event) {
  event.preventDefault();

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

