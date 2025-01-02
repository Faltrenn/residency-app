async function boa() {
  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: "Emanuel", pass: "senha" }),
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

boa();
