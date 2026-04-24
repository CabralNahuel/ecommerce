(() => {
  const initMobileNav = () => {
    const nav = document.querySelector("nav.navbar");
    if (!nav) return;

    const toggle = nav.querySelector(".navbar__toggle");
    const menu = nav.querySelector("#primary-navigation, .navbar__menu");
    if (!toggle || !menu) return;

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
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
  } else {
    initMobileNav();
  }
})();
