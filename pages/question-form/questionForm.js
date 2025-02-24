import { KEYS, stateManager } from "../../src/js/stateManager.js";
import { fetchAPI } from "../../src/js/utils.js";

export function startQuestionForm({ update, data }) {
  let aabtn = document.getElementById("add-answer");
  aabtn.onclick = addAnswer;

  if (update) {
    startUpdateQuestion(data);
    return;
  }
  startAddQuestion();
}

export async function startUpdateQuestion(question) {
  document.querySelector("button[type=submit]").textContent = "Editar Pergunta";

  question = await stateManager.refreshState(KEYS.UPDATE_QUESTION, question);

  document
    .getElementById("question-form")
    .addEventListener("submit", (event) => {
      updateQuestion(event, question.id);
    });

  document.getElementById("title").value = question.title;

  let answersElement = document.getElementById("answers");
  let a = question.answers.shift();
  document.querySelector("#answers > input").value = a.title;

  question.answers.forEach((answer) => {
    let input = document.createElement("input");
    input.className = "input-field";
    input.setAttribute("type", "text");
    input.value = answer.title;
    answersElement.appendChild(input);
  });
}

export async function startAddQuestion() {
  document
    .getElementById("question-form")
    .addEventListener("submit", (event) => {
      addQuestion(event);
    });

  document.querySelector("button[type=submit]").textContent = "Criar Pergunta";
}

export async function addQuestion(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const inputs = document.querySelectorAll("#answers > input");

  let answers = [];
  inputs.forEach((input) => {
    answers.push({ title: input.value });
  });

  try {
    await fetchAPI(
      "/questions",
      "POST",
      {},
      { title: title, answers: answers },
    );
  } catch (error) {
    alert(`Não foi possível adicionar a pergunta. Tente novamente.\n${error}`);
  }
}

export async function updateQuestion(event, id) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const inputs = document.querySelectorAll("#answers > input");

  let answers = [];
  inputs.forEach((input) => {
    answers.push({ title: input.value });
  });

  try {
    await fetchAPI(
      "/questions",
      "PUT",
      {},
      { id: id, title: title, answers: answers },
    );
  } catch (error) {
    alert(`Não foi possível atualizar a pergunta. Tente novamente.\n${error}`);
  }
}

export function addAnswer() {
  let answers = document.getElementById("answers");
  let a = document.createElement("input");
  a.setAttribute("type", "text");
  a.className = "input-field";
  a.required = true;
  answers.appendChild(a);
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
