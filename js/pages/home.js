var ROLE_ROUTES = {
  Admin: "../../pages/admin/index.html",
  Professor: "../../pages/professor/index.html",
  Residente: "../../pages/resident/index.html",
};

function logout() {
  localStorage.clear();
  role = null;
  token = null;
  reloadWindow();
}

if (role) {
  setRouteToApp(ROLE_ROUTES[role], "home-app");
}
