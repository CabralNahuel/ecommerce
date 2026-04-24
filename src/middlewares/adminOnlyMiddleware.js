const adminOnlyMiddleware = (req, res, next) => {
  const user = req.session?.loggeduser;

  if (!user || !user.admin) {
    return res.status(403).render("error", {
      titulo: "Acceso denegado",
      error: { msj: "Solo administradores pueden ingresar al panel admin." },
    });
  }

  next();
};

export default adminOnlyMiddleware;
