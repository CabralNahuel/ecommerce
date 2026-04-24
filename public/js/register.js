(function () {
  const form = document.getElementById("register-form");
  if (!form) return;

  const PASS_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]+$/;

  const fields = {
    name: {
      input: document.getElementById("register-name"),
      error: document.getElementById("register-name-error"),
    },
    last_name: {
      input: document.getElementById("register-last-name"),
      error: document.getElementById("register-last-name-error"),
    },
    email: {
      input: document.getElementById("register-email"),
      error: document.getElementById("register-email-error"),
    },
    pass: {
      input: document.getElementById("register-pass"),
      error: document.getElementById("register-pass-error"),
    },
    pass2: {
      input: document.getElementById("register-pass2"),
      error: document.getElementById("register-pass2-error"),
    },
    terms: {
      input: document.getElementById("register-terms"),
      error: document.getElementById("register-terms-error"),
    },
  };

  function clearError(key) {
    const f = fields[key];
    if (!f || !f.input) return;
    if (key !== "terms") {
      f.input.classList.remove("login-input--error");
    }
    f.input.removeAttribute("aria-invalid");
    if (f.error) {
      f.error.textContent = "";
      f.error.hidden = true;
    }
  }

  function setError(key, message) {
    const f = fields[key];
    if (!f || !f.input) return;
    if (key !== "terms") {
      f.input.classList.add("login-input--error");
    }
    f.input.setAttribute("aria-invalid", "true");
    if (f.error) {
      f.error.textContent = message;
      f.error.hidden = false;
    }
  }

  Object.keys(fields).forEach(function (key) {
    const el = fields[key].input;
    if (!el) return;
    el.addEventListener("input", function () {
      clearError(key);
    });
    el.addEventListener("change", function () {
      clearError(key);
    });
  });

  function validate() {
    let ok = true;
    Object.keys(fields).forEach(function (key) {
      clearError(key);
    });

    const nameVal = (fields.name.input && fields.name.input.value.trim()) || "";
    const lastVal =
      (fields.last_name.input && fields.last_name.input.value.trim()) || "";
    const emailVal =
      (fields.email.input && fields.email.input.value.trim()) || "";
    const passVal = (fields.pass.input && fields.pass.input.value) || "";
    const pass2Val = (fields.pass2.input && fields.pass2.input.value) || "";
    const termsOk = fields.terms.input && fields.terms.input.checked;

    if (nameVal.length < 3) {
      setError("name", "Ingresá al menos 3 letras en el nombre.");
      ok = false;
    }

    if (lastVal.length < 2) {
      setError("last_name", "Ingresá tu apellido.");
      ok = false;
    }

    if (!emailVal) {
      setError("email", "Ingresá tu email.");
      ok = false;
    } else if (
      fields.email.input.validity &&
      fields.email.input.validity.typeMismatch
    ) {
      setError("email", "Ingresá un email válido.");
      ok = false;
    }

    if (!passVal) {
      setError("pass", "Ingresá una contraseña.");
      ok = false;
    } else if (passVal.length < 8 || passVal.length > 50) {
      setError("pass", "La contraseña debe tener entre 8 y 50 caracteres.");
      ok = false;
    } else if (!PASS_PATTERN.test(passVal)) {
      setError(
        "pass",
        "Usá mayúscula, minúscula, número y un símbolo (ej. @$!%*?& . _ -)."
      );
      ok = false;
    }

    if (!pass2Val) {
      setError("pass2", "Repetí la contraseña.");
      ok = false;
    } else if (passVal !== pass2Val) {
      setError("pass2", "Las contraseñas no coinciden.");
      ok = false;
    }

    if (!termsOk) {
      setError("terms", "Debés aceptar los términos y condiciones.");
      ok = false;
    }

    return ok;
  }

  form.addEventListener("submit", function (e) {
    if (!validate()) {
      e.preventDefault();
      const order = ["name", "last_name", "email", "pass", "pass2", "terms"];
      for (let i = 0; i < order.length; i++) {
        const inp = fields[order[i]].input;
        if (inp && inp.getAttribute("aria-invalid") === "true") {
          inp.focus();
          break;
        }
      }
    }
  });
})();
