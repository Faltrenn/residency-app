var ROLE_ROUTES = {
  Admin: "../../pages/admin/index.html",
  Professor: "../../pages/professor/index.html",
  Residente: "../../pages/resident/index.html",
};

if (role) {
  setRouteToApp(ROLE_ROUTES[role], "home-app");
}
