import { fetchAPI } from "../../src/js/utils.js";
import { token } from "../login/script.js";

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
    alert(`Não foi possível adicionar a pergunta. Tente novamente.\n${error}`);
  }
}

export async function updateQuestionnaire(event) {
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
      "/questionnaires",
      "PUT",
      { token: token },
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
  a.required = true;
  answers.appendChild(a);
}
