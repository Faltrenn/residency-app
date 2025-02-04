import { fetchQuestions } from "../../src/js/utils.js";

export async function questionsStart() {
  const ql = document.getElementById("questions-list");

  let questions = await fetchQuestions();
  questions.forEach((question) => {
    let q = document.createElement("h2");
    q.textContent = question["title"];
    ql.appendChild(q);
    let l = document.createElement("ul")
    question["answers"].forEach((answer) => {
      let a = document.createElement("li");
      a.textContent = answer["title"];
      l.appendChild(a);
    });
    ql.appendChild(l);
  });
}


