(function () {
  const form = document.getElementById("login-form");
  if (!form) return;

  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const emailError = document.getElementById("login-email-error");
  const passwordError = document.getElementById("login-password-error");

  function clearFieldError(input, errorEl) {
    input.classList.remove("login-input--error");
    input.removeAttribute("aria-invalid");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.hidden = true;
    }
  }

  function setFieldError(input, errorEl, message) {
    input.classList.add("login-input--error");
    input.setAttribute("aria-invalid", "true");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  }

  function validate() {
    let ok = true;
    const emailVal = (emailInput && emailInput.value.trim()) || "";
    const passVal = (passwordInput && passwordInput.value) || "";

    clearFieldError(emailInput, emailError);
    clearFieldError(passwordInput, passwordError);

    if (!emailVal) {
      setFieldError(emailInput, emailError, "Ingresá tu email.");
      ok = false;
    } else if (emailInput.validity && emailInput.validity.typeMismatch) {
      setFieldError(emailInput, emailError, "Ingresá un email válido.");
      ok = false;
    }

    if (!passVal.trim()) {
      setFieldError(passwordInput, passwordError, "Ingresá tu contraseña.");
      ok = false;
    }

    return ok;
  }

  emailInput.addEventListener("input", function () {
    clearFieldError(emailInput, emailError);
  });
  passwordInput.addEventListener("input", function () {
    clearFieldError(passwordInput, passwordError);
  });

  form.addEventListener("submit", function (e) {
    if (!validate()) {
      e.preventDefault();
      const emailTrim = emailInput.value.trim();
      const emailOk =
        emailTrim && !(emailInput.validity && emailInput.validity.typeMismatch);
      if (!emailOk) emailInput.focus();
      else passwordInput.focus();
    }
  });
})();
