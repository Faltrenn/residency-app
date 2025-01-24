import { navigate } from "../router.js";
import { role } from "./login.js";

var ROLE_ROUTES = {
  Admin: "../../pages/admin/index.html",
  Professor: "../../pages/professor/index.html",
  Residente: "../../pages/resident/index.html",
};

if (role) {
  navigate(`/${role}`, "home-app");
}
