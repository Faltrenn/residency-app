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
