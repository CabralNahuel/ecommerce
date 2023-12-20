document.addEventListener("DOMContentLoaded", () => {
  function setupQuantityControls(addId, substractId, quantityId) {
    const add = document.getElementById(addId);
    const substract = document.getElementById(substractId);
    const quantity = document.getElementById(quantityId);

    if (add && substract && quantity) {
      add.addEventListener(
        "click",
        () => (quantity.value = Number(quantity.value) + 1)
      );
      substract.addEventListener("click", () => {
        if (quantity.value > 0) {
          quantity.value = Number(quantity.value) - 1;
        }
      });
    }
  }

  setupQuantityControls("add", "substract", "quantity");
  setupQuantityControls("add1", "substract1", "quantity1");
  setupQuantityControls("add2", "substract2", "quantity2");
});
