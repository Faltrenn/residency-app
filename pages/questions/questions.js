import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchQuestions } from "../../src/js/utils.js";

export async function questionsStart() {
  const ql = document.getElementById("questions-list");
  ql.innerHTML = "";

  let questions = await fetchQuestions();
  questions.forEach((question) => {
    let questionCard = document.createElement("div");
    questionCard.classList.add("question-card");

    let title = document.createElement("h2");
    title.textContent = question["title"];
    questionCard.appendChild(title);

    let answerList = document.createElement("ul");
    answerList.classList.add("answer-list");
    question["answers"].forEach((answer) => {
      let answerItem = document.createElement("li");
      answerItem.textContent = answer["title"];
      answerList.appendChild(answerItem);
    });
    questionCard.appendChild(answerList);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    let btnDel = document.createElement("button");
    btnDel.classList.add("button", "button-delete");
    btnDel.onclick = () => deleteQuestion(question["id"]);
    btnDel.textContent = "DEL";
    buttonContainer.appendChild(btnDel);

    let btnUpd = document.createElement("button");
    btnUpd.classList.add("button", "button-update");
    btnUpd.onclick = () => navigate("/update-question", "app", question);
    btnUpd.textContent = "UPD";
    buttonContainer.appendChild(btnUpd);

    questionCard.appendChild(buttonContainer);
    ql.appendChild(questionCard);
  });
}
export async function deleteQuestion(id) {
  await fetchAPI("/questions", "DELETE", {}, { id: id });
  await questionsStart();
}
