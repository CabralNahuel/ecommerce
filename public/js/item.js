const btnMas = document.querySelector("#mas");
const btnMenos = document.querySelector("#menos");
const quantityInput = document.querySelector("#quantity");

if (btnMas && btnMenos && quantityInput) {
  btnMas.addEventListener("click", () => {
    quantityInput.value = Number(quantityInput.value || 0) + 1;
  });

  btnMenos.addEventListener("click", () => {
    if (Number(quantityInput.value) > 0) {
      quantityInput.value = Number(quantityInput.value) - 1;
    }
  });
}
