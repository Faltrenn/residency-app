import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchQuestionnaires } from "../../src/js/utils.js";
import { role } from "../login/login.js";

export async function questionnairesStart() {
  const ql = document.getElementById("questionnaires-list");
  ql.innerHTML = "";

  if (role == "Residente") {
    document.getElementById("add-questionnaire").remove();
  }

  let questionnaires = await fetchQuestionnaires();
  questionnaires.forEach((questionnaire) => {
    ql.appendChild(renderQuestionnaire(questionnaire));
  });
}

export function renderQuestionnaire(questionnaire) {
  let quest = document.createElement("div");
  quest.className = "container questionnaire";

  let header = document.createElement("div");
  header.className = "questionnaire-header";
  let info = document.createElement("div");
  info.className = "questionnaire-header-info";
  header.appendChild(info);
  quest.appendChild(header);

  let h3 = document.createElement("h3");
  h3.className = "student-name";
  h3.textContent = questionnaire.resident.name;
  info.appendChild(h3);

  let h4 = document.createElement("h4");
  h4.className = "procedure-title";
  h4.textContent = questionnaire.procedure.title;
  info.appendChild(h4);

  if (role != "Residente") {
    let btnContainer = document.createElement("div");
    btnContainer.className = "button-container";
    header.appendChild(btnContainer);

    let btnUpdate = document.createElement("button");
    btnUpdate.className = "small-button button-update";
    btnUpdate.addEventListener("click", () => {
      navigate("/update-questionnaire", questionnaire);
    });
    btnUpdate.textContent = "Atualizar";
    btnContainer.appendChild(btnUpdate);

    let btnDelete = document.createElement("button");
    btnDelete.className = "small-button button-delete";
    btnDelete.addEventListener("click", deleteQuestionnaire);
    btnDelete.textContent = "Excluir";
    btnContainer.appendChild(btnDelete);
  }

  let questions = document.createElement("div");
  questions.className = "questions";
  quest.appendChild(questions);

  questionnaire.questions_answereds.forEach((qa) => {
    let question = document.createElement("div");
    question.className = "question";
    question.textContent = qa.title;
    questions.appendChild(question);
    let answer = document.createElement("div");
    answer.className = "answer";
    answer.textContent = `Resposta: ${qa.answer.title}`;
    questions.appendChild(answer);
  });

  return quest;
}

export async function deleteQuestionnaire(id) {
  await fetchAPI("/questionnaires", "DELETE", {}, { id: id });
  await questionnairesStart();
}
