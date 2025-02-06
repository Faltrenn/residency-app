export async function startUpdateRole(role) {
  document
    .getElementById("add-role-form")
    .addEventListener("submit", (event) => {
      updateRole(event);
    });

  document.getElementById("last_title").value = role["title"];
  document.getElementById("title").value = role["title"];
}
