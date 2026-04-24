import { validationResult } from "express-validator";

/** Respuesta JSON genérica (reservada por si se reutiliza). */
export const validacion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/** Tras express-validator en POST /login/register: vuelve a la vista con errores y datos previos. */
export const registerValidationHandler = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).render("register", {
      titulo: "Crear cuenta | Funkoshop",
      errors: result.mapped(),
      oldBody: req.body || {},
    });
  }
  next();
};
