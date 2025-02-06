import { navigate } from "../../src/js/router.js";
import { fetchAPI, fetchQuestionnaires } from "../../src/js/utils.js";

export async function questionnairesStart() {
  const ql = document.getElementById("questionnaires-list");

  let questionnaires = await fetchQuestionnaires();
  questionnaires.forEach((questionnaire) => {
    let btn = document.createElement("button");
    btn.onclick = () => {
      deleteQuestionnaire(questionnaire["id"]);
    };
    btn.textContent = "DEL";
    ql.appendChild(btn);

    let btn2 = document.createElement("button");
    btn2.onclick = () => {
      navigate("/update-questionnaire", "app", questionnaire);
    };
    btn2.textContent = "UPD";
    ql.appendChild(btn2);

    let q1 = document.createElement("h1");
    q1.textContent = questionnaire["professor"]["name"];
    let q2 = document.createElement("h1");
    q2.textContent = questionnaire["resident"]["name"];

    ql.appendChild(q1);
    ql.appendChild(q2);
    let l = document.createElement("ul")
    questionnaire["questions_answereds"].forEach((answer) => {
      let q3 = document.createElement("h2");
      q3.textContent = answer["title"];
      l.appendChild(q3)

      let a = document.createElement("li");
      a.textContent = answer["answer"]["title"];
      l.appendChild(a);
    });
    ql.appendChild(l);
  });
}

export async function deleteQuestionnaire(id) {
  await fetchAPI("/questionnaires", "DELETE", {}, { id: id });
  await questionnairesStart();
}

