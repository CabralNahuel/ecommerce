import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Nombre inválido")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo debe contener letras y espacios"),
  body("last_name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Apellido inválido")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El apellido solo debe contener letras y espacios"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email invalido, intente nuevamente")
    .isLength({ max: 55 })
    .withMessage(
      "La dirección de correo electrónico no puede tener más de 55 caracteres"
    ),
  body("pass")
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]+$/
    )
    .withMessage(
      "La contraseña debe tener mayúscula, minúscula, número y un símbolo (ej. @$!%*?& . _ -)"
    )
    .isLength({ min: 8, max: 50 })
    .withMessage("La contraseña debe tener entre 8 y 50 caracteres"),
  body("pass2")
    .custom((value, { req }) => value === req.body.pass)
    .withMessage("Las contraseñas no coinciden"),
  body("termsAccepted")
    .exists()
    .withMessage("Debés aceptar los términos y condiciones"),
];
