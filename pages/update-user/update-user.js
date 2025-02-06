export async function startUpdateUser(user) {
  document
    .getElementById("add-user-form")
    .addEventListener("submit", (event) => {
      updateUser(event);
    });

  const roles = await fetchAPI("/roles", "GET", { token: token }, null);

  const rolesSelect = document.getElementById("role-select");
  roles.forEach((role) => {
    const o = document.createElement("option");
    o.innerText = role["title"];
    o.value = role["title"];
    rolesSelect.appendChild(o);
  });

  const institutions = await fetchAPI(
    "/institutions",
    "GET",
    { token: token },
    null,
  );

  const institutionSelect = document.getElementById("institution-select");
  institutions.forEach((institution) => {
    const o = document.createElement("option");
    o.innerText = `${institution["short_name"]} - ${institution["name"]}`;
    o.value = institution["short_name"];
    institutionSelect.appendChild(o);
  });

  document.getElementById("id").value = user["id"];
  document.getElementById("name").value = user["name"];
  document.getElementById("institution-select").value = user["institution"];
  document.getElementById("role-select").value = user["role"];
  document.getElementById("pass").value = user["pass"];
}
