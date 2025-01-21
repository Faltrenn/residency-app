const ROLE_ROUTES = {
  Admin: "../../pages/admin/index.html",
};

function logout() {
  localStorage.clear();
  reloadWindow();
}

if (role) {
  setRouteToApp(ROLE_ROUTES[role], "home-app");
}
