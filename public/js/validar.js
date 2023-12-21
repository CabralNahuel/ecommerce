window.onload = function () {
  //  let borrar = document.getElementById("borrar");
  //  borrar.addEventListener("click", borrar);

  let nombre = document.getElementById("nombre");
  nombre.addEventListener("input", campoNombre);

  let apellido = document.getElementById("apellido");
  apellido.addEventListener("input", campoApellido);

  let correo = document.getElementById("correo");
  correo.addEventListener("input", campoCorreo);

  let asunto = document.getElementById("asunto");
  asunto.addEventListener("input", campoAsunto);

  let mensaje = document.getElementById("mensaje");
  mensaje.addEventListener("input", campoMensaje);
};

function campoNombre() {
  let cNombre = document.getElementById("nombre").value;

  if (cNombre) {
    document.getElementById("nombre_error").innerHTML = " ";
    document.getElementById("nombre").style.outline = "0.5px solid #000";
  }
}

function campoApellido() {
  let cApellido = document.getElementById("apellido").value;

  if (cApellido) {
    document.getElementById("apellido_error").innerHTML = " ";
    document.getElementById("apellido").style.outline = "0.5px solid #000";
  }
}

function campoCorreo() {
  let cCorreo = document.getElementById("correo").value;

  if (cCorreo) {
    document.getElementById("correo_error").innerHTML = " ";
    document.getElementById("correo").style.outline = "0.5px solid #000";
  }
}

function campoAsunto() {
  let cAsunto = document.getElementById("asunto").value;

  if (cAsunto) {
    document.getElementById("asunto_error").innerHTML = " ";
    document.getElementById("asunto").style.outline = "0.5px solid #000";
  }
}

function campoMensaje() {
  let cMensaje = document.getElementById("mensaje").value;

  if (cMensaje) {
    document.getElementById("mensaje_error").innerHTML = " ";
    document.getElementById("mensaje").style.outline = "0.5px solid #000";
  }
}

function borrar() {
  document.location.reload(true);
}

function validarf() {
  let expNomape = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
  let expCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let cNombre = document.getElementById("nombre").value;
  let cApellido = document.getElementById("apellido").value;
  let cCorreo = document.getElementById("correo").value;
  let cAsunto = document.getElementById("asunto").value;
  let cMensaje = document.getElementById("mensaje").value;
  let nombreError = document.getElementById("nombre_error");
  let apellidoError = document.getElementById("apellido_error");
  let correoError = document.getElementById("correo_error");
  let asuntoError = document.getElementById("asunto_error");
  let mensajeError = document.getElementById("mensaje_error");
  let campoNombre = document.getElementById("nombre");
  let campoApellido = document.getElementById("apellido");
  let campoCorreo = document.getElementById("correo");
  let campoAsunto = document.getElementById("asunto");
  let campoMensaje = document.getElementById("mensaje");

  if (!cNombre) {
    let mensajeErrorNombre = "Por favor, ingresa tu Nombre";
    nombreError.innerHTML = mensajeErrorNombre;
    campoNombre.style.outline = "1px solid #f00";
    return false;
  } else if (!expNomape.test(cNombre)) {
    let mensajeInvalidoNombre = "El Nombre ingresado no es válido!";
    nombreError.innerHTML = mensajeInvalidoNombre;
    campoNombre.style.outline = "1px solid #f00";
    return false;
  }

  if (!cApellido) {
    let mensajeErrorApellido = "Por favor, ingresa tu Apellido";
    apellidoError.innerHTML = mensajeErrorApellido;
    campoApellido.style.outline = "1px solid #f00";
    return false;
  } else if (!expNomape.test(cApellido)) {
    let mensajeInvalidoApellido = "El Apellido ingresado no es válido!";
    apellidoError.innerHTML = mensajeInvalidoApellido;
    campoApellido.style.outline = "1px solid #f00";
    return false;
  }

  if (!cCorreo) {
    let mensajeErrorCorreo = "Por favor, ingresa tu Mail";
    correoError.innerHTML = mensajeErrorCorreo;
    campoCorreo.style.outline = "1px solid #f00";
    return false;
  } else if (!expCorreo.test(cCorreo)) {
    let mensajeInvalidoCorreo = "El Mail ingreso no es válido";
    correoError.innerHTML = mensajeInvalidoCorreo;
    campoCorreo.style.outline = "1px solid #f00";
    return false;
  }

  if (!cAsunto) {
    let mensajeErrorAsunto = "Por favor, ingresa el motivo de tu consulta";
    asuntoError.innerHTML = mensajeErrorAsunto;
    campoAsunto.style.outline = "1px solid #f00";
    return false;
  } else if (!isNaN(cAsunto)) {
    let mensajeNumerosAsunto = "No se permiten Numeros en el Asunto";
    asuntoError.innerHTML = mensajeNumerosAsunto;
    campoAsunto.style.outline = "1px solid #f00";
    return false;
  }

  if (!cMensaje) {
    let mensajeErrorMensaje = "Por favor, ingresa el detalle de tu consulta";
    mensajeError.innerHTML = mensajeErrorMensaje;
    campoMensaje.style.outline = "1px solid #f00";
    return false;
  } else if (cMensaje.length >= 255) {
    let mensajeLargo = "Tu Mensaje es demasiado Largo";
    mensajeError.innerHTML = mensajeLargo;
    campoMensaje.style.outline = "1px solid #f00";
    return false;
  }

  if (cNombre && cApellido && cCorreo && cAsunto && cMensaje) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Muchas Gracias por tu consulta. Nos comunicaremos a la brevedad",
      showConfirmButton: false,
      timer: 3000,
    });
    document.getElementById("form").reset();
  }
}
