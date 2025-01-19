function logout() {
  localStorage.clear();
  reloadWindow();
}

if (role) {
  const app = document.getElementById("home-app");
  app.innerHTML += `<h1>${role}</h1>`;
}
