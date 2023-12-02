const add = document.querySelector("#mas");
const substract = document.querySelector("#menos");
const quantity = document.querySelector("#quantity");

add.addEventListener("click", () => {
  quantity.value = Number(quantity.value) + 1;
});

substract.addEventListener("click", () => {
  if (quantity.value > 0) quantity.value = Number(quantity.value) - 1;
});
