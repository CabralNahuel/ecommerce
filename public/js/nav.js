(function () {
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector("#primary-navigation");
  if (!nav || !toggle || !menu) return;

  const setOpen = (open) => {
    nav.classList.toggle("navbar--open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("navbar--open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
})();
