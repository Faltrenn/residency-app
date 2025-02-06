import { fetchAPI } from "../../src/js/utils.js";
import { token } from "../login/login.js";

export async function startAddQuestion() {
  document
    .getElementById("add-question-form")
    .addEventListener("submit", (event) => {
      addQuestion(event);
    });
  let aabtn = document.getElementById("add-answer");
  aabtn.onclick = addAnswer;
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
      { token: token },
      { title: title, answers: answers },
    );
  } catch (error) {
    alert(`Não foi possível adicionar a pergunta. Tente novamente.\n${error}`);
  }
}

export function addAnswer() {
  let answers = document.getElementById("answers");
  let a = document.createElement("input");
  a.setAttribute("type", "text");
  a.required = true;
  answers.appendChild(a);
}
