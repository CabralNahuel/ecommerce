const cantiTag = document.getElementById("canti");
const subtotTag = document.getElementById("subtot");
const totalTag = document.getElementById("total");
const pagar = document.getElementById("pagar");

function updateTotals() {
  if (!cantiTag || !subtotTag || !totalTag) return;

  let canti = 0;
  let total = 0;
  const items = document.getElementsByName("items");

  [...items].forEach((item) => {
    const countEl = item.querySelector('span[name="count"]');
    const totalpEl = item.querySelector('p[name="totalp"]');
    if (!countEl || !totalpEl) return;
    canti += parseInt(countEl.innerText, 10) || 0;
    total += Number(totalpEl.innerText) || 0;
  });

  cantiTag.innerText = String(canti);
  subtotTag.innerText = total.toFixed(2);
  totalTag.innerText = total.toFixed(2);
}

function refresh() {
  updateTotals();
}

const cartIncrementQuantity = (product_id, cart_price) => {
  const count = document.getElementById(`count-${product_id}`);
  if (!count) return;
  count.innerText = String(parseInt(count.innerText, 10) + 1);
  const totalu = (Number(cart_price) * parseInt(count.innerText, 10)).toFixed(2);
  const totalEl = document.getElementById(`total-${product_id}`);
  if (totalEl) totalEl.innerHTML = totalu;
  refresh();
};

const subs = (product_id, cart_price) => {
  const count = document.getElementById(`count-${product_id}`);
  if (!count) return;
  if (parseInt(count.innerText, 10) >= 1) {
    count.innerText = String(parseInt(count.innerText, 10) - 1);
  }
  const totalu = (Number(cart_price) * parseInt(count.innerText, 10)).toFixed(2);
  const totalEl = document.getElementById(`total-${product_id}`);
  if (totalEl) totalEl.innerHTML = totalu;
  refresh();
};

if (pagar) {
  pagar.addEventListener("click", () => {
    const canti = parseInt(cantiTag.innerText, 10) || 0;
    if (canti === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No hay productos en el carrito",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Gracias por tu compra!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  });
}

refresh();
