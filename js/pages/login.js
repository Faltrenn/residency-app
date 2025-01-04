async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username);
  console.log(password);
  try {
    const response = await fetch("http://172.20.10.2:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username, pass: password }),
    });

    if (!response.ok) {
      // Lança erro se a resposta não for um status 2xx
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    alert(`Token recebido: ${data.token}`);
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Não foi possível realizar o login. Tente novamente.");
  }
}
