/**
 * Define o que vai ser executado quando um <a> for clicaco
 * @param {string} elementID - Onde estarão os links(<a>).
 * @param {function} logic - O que será executado.
 **/
export function setLinksLogic(elementID, logic) {
  document.getElementById(elementID).addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && link.getAttribute("href")) {
      event.preventDefault();
      const path = link.getAttribute("href");
      logic(path);
    }
  });
}
