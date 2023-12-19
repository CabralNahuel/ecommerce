import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Nombre invalido")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo debe contener letras y espacios"),
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
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial"
    )
    .isLength({ min: 8, max: 50 })
    .withMessage("La contraseña debe tener entre 8 y 50 caracteres"),
  body("pass2")
    .custom((value, { req }) => value === req.body.pass)
    .withMessage("Las contraseñas no coinciden"),
];
