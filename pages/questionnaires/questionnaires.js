import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchQuestionnaires } from "../../src/js/utils.js";
import { updateQuestionnaire } from "../update-questionnaire/update-questionnaire.js";

export async function questionnairesStart() {
  const ql = document.getElementById("questionnaires-list");
  ql.innerHTML = "";

  let questionnaires = await fetchQuestionnaires();
  questionnaires.forEach((questionnaire) => {
    ql.appendChild(renderQuestionnaire(questionnaire));
  });

  //let questionnaires = await fetchQuestionnaires();
  //questionnaires.forEach((questionnaire) => {
  //  let btn = document.createElement("button");
  //  btn.onclick = () => {
  //    deleteQuestionnaire(questionnaire["id"]);
  //  };
  //  btn.textContent = "DEL";
  //  ql.appendChild(btn);
  //
  //  let btn2 = document.createElement("button");
  //  btn2.onclick = () => {
  //    navigate("/update-questionnaire", "app", questionnaire);
  //  };
  //  btn2.textContent = "UPD";
  //  ql.appendChild(btn2);
  //
  //  let q1 = document.createElement("h1");
  //  q1.textContent = questionnaire["professor"]["name"];
  //  let q2 = document.createElement("h1");
  //  q2.textContent = questionnaire["resident"]["name"];
  //
  //  ql.appendChild(q1);
  //  ql.appendChild(q2);
  //  let l = document.createElement("ul");
  //  questionnaire["questions_answereds"].forEach((answer) => {
  //    let q3 = document.createElement("h2");
  //    q3.textContent = answer["title"];
  //    l.appendChild(q3);
  //
  //    let a = document.createElement("li");
  //    a.textContent = answer["answer"]["title"];
  //    l.appendChild(a);
  //  });
  //  ql.appendChild(l);
  //});
}

export async function deleteQuestionnaire(id) {
  await fetchAPI("/questionnaires", "DELETE", {}, { id: id });
  await questionnairesStart();
}

export function renderQuestionnaire(questionnaire) {
  let quest = document.createElement("div");
  quest.className = "container questionnaire";

  let header = document.createElement("div");
  header.className = "questionnaire-header";
  quest.appendChild(header);

  let h3 = document.createElement("h3");
  h3.className = "student-name";
  h3.textContent = questionnaire.resident.name;
  header.appendChild(h3);

  let btnContainer = document.createElement("div");
  btnContainer.className = "button-container";
  header.appendChild(btnContainer);

  let btnUpdate = document.createElement("button");
  btnUpdate.className = "small-button button-update";
  btnUpdate.addEventListener("click", updateQuestionnaire);
  btnUpdate.textContent = "Atualizar";
  btnContainer.appendChild(btnUpdate);

  let btnDelete = document.createElement("button");
  btnDelete.className = "small-button button-delete";
  btnDelete.addEventListener("click", deleteQuestionnaire);
  btnDelete.textContent = "Excluir";
  btnContainer.appendChild(btnDelete);

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
  //questionsHtml += `<div class="question">${r.question}</div><div class="answer">Resposta: ${r.answer}</div>`;

  return quest;

  //< div class="questions" > ${ questionsHtml }</div >
}
