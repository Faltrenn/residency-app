const app = document.getElementById("app");
const route = window.location.pathname;
async function loadContent(id) {
  app.innerHTML = await fetch(
    id === 0 ? "../pages/home.html" : "../pages/home2.html",
  ).then((r) => r.text());

  // Executa os scripts embutidos manualmente
  const scripts = app.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    newScript.textContent = oldScript.textContent;
    // Adicionar script e remover após executado
    document.body.appendChild(newScript);
    document.body.removeChild(newScript);
  });
}

loadContent(0)
