import { navigate } from "../../src/js/router.js";
import { fetchQuestions } from "../../src/js/utils.js";

export async function questionsStart() {
  const ql = document.getElementById("questions-list");

  let questions = await fetchQuestions();
  questions.forEach((question) => {
    let q = document.createElement("h2");

    //let btn = document.createElement("button");
    //btn.onclick = () => {
    //  deleteQuestion(element["id"]);
    //};
    //btn.textContent = "DEL";
    //ql.appendChild(btn);

    let btn2 = document.createElement("button");
    btn2.onclick = () => {
      navigate("/update-question", "app", question);
    };
    btn2.textContent = "UPD";
    ql.appendChild(btn2);

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


