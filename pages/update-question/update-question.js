import { fetchAPI } from "../../src/js/utils.js";

export async function startUpdateQuestion(question) {
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
}

export async function updateQuestion(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
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
