import { fetchAPI } from "../../src/js/utils.js";
import { token } from "../login/script.js";

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

export async function updateQuestion(event) {
  event.preventDefault();

  //try {
  //  await fetchAPI(
  //    "/questions",
  //    "PUT",
  //    { token: token },
  //    { id: id, name: name, institution: institution, role: role, pass: pass },
  //  );
  //} catch (error) {
  //  alert(`Não foi possível adicionar o usuário. Tente novamente.\n${error}`);
  //}
}

export function addAnswer() {
  let answers = document.getElementById("answers");
  let a = document.createElement("input");
  a.setAttribute("type", "text");
  a.required = true;
  answers.appendChild(a);
}
