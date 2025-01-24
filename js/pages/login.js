export let role = localStorage.getItem("role");
export let token = localStorage.getItem("token");

async function verifyToken() {
  if (token) {
    const response = await fetch("http://localhost:8000/login/check", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    if (!response.ok) {
      alert("Token expirado!");
      token = null;
      role = null;
      localStorage.clear();
      return;
    }
    const data = await response.json();

    localStorage.setItem("role", data["role"]);
  }
}

export async function refreshRoleAndToken() {
  await verifyToken();

  role = localStorage.getItem("role");
  token = localStorage.getItem("token");
}

export async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username, pass: password }),
    });

    if (!response.ok) {
      // Erro se a resposta não for um status 2xx
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    alert(`Token recebido: ${data.token}`);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    role = data.role;
    token = data.token;
    navigateTo("/");
    document.getElementById("navbar").innerHTML +=
      '<button id = "logout" onclick="logout();">Log out</button>';
  } catch (error) {
    alert(`Não foi possível realizar o login. Tente novamente.\n${error}`);
  }
}

export function logout() {
  localStorage.clear();
  role = null;
  token = null;
  reloadWindow();
}
