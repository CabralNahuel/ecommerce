import services from "../services/authServices.js";

const withTimeout = (promise, ms, message) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);

const saveSession = (req) =>
  new Promise((resolve, reject) => {
    req.session.save((err) => (err ? reject(err) : resolve()));
  });

const destroySession = (req) =>
  new Promise((resolve, reject) => {
    if (!req.session) return resolve();
    req.session.destroy((err) => (err ? reject(err) : resolve()));
  });

const autController = {
  getAuthLogin: (req, res) => {
    res.render("login.ejs", {
      titulo: "LOGIN | Funkoshop",
      loginerror: "",
    });
  },

  getAuthLogout: async (req, res) => {
    try {
      await withTimeout(
        destroySession(req),
        5000,
        "Timeout al destruir la sesión"
      );
      res.clearCookie("connect.sid");
      return res.redirect("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).render("error", {
        titulo: "Error",
        error: { msj: "No se pudo cerrar la sesión. Intentá nuevamente." },
      });
    }
  },

  getAuthRegister: (req, res) => {
    res.render("register", {
      titulo: "Crear cuenta | Funkoshop",
      errors: null,
      oldBody: null,
    });
  },

  postAuthLogin: async (req, res) => {
    const user = req.body;
    const { email, pass } = user;

    if (email === "admin@test.com" && pass === "adminTest") {
      req.session.loggeduser = {
        id: 0,
        email: "admin@test.com",
        name: "admin",
        admin: 1,
      };
      try {
        await withTimeout(
          saveSession(req),
          5000,
          "Timeout al guardar la sesión de admin"
        );
        return res.redirect("/admin");
      } catch (err) {
        console.error("No se pudo guardar la sesión de admin:", err);
        return res.status(500).render("error", {
          titulo: "Error",
          error: { msj: "No se pudo iniciar sesión. Intentá nuevamente." },
        });
      }
    }

    const userDB = await services.getUserByEmail(email);
    
    if (userDB) {
      if (pass === userDB.pass) {
          const loggeduser={id:userDB.id,email,name:userDB.name,admin:userDB.admin}
          req.session.loggeduser=loggeduser
          try {
            await withTimeout(
              saveSession(req),
              5000,
              "Timeout al guardar la sesión"
            );
            if (loggeduser.admin) {
              return res.redirect("/admin");
            }
            return res.redirect("/");
          } catch (err) {
            console.error("No se pudo guardar la sesión:", err);
            return res.status(500).render("error", {
              titulo: "Error",
              error: { msj: "No se pudo iniciar sesión. Intentá nuevamente." },
            });
          }
      } 
      else {
        res.render("login.ejs", {
          titulo: "LOGIN | Funkoshop",
          loginerror: "Usuario o contraseña no coinciden",
        });
      }
    } 
    else {
      //res.send("usuario no encontrado voy al register para registrarse");
      res.render("register", {
        titulo: "Crear cuenta | Funkoshop",
        errors: null,
        oldBody: null,
      });
    }
  },

  postAuthRegister: async (req, res) => {
    const { name, last_name, email, pass } = req.body;
    try {
      await services.postUser({
        name: String(name).trim(),
        last_name: String(last_name).trim(),
        email: String(email).trim(),
        pass: String(pass),
        admin: 0,
      });
      res.render("login.ejs", {
        titulo: "LOGIN | Funkoshop",
        loginerror: "",
      });
    } catch (err) {
      console.error(err);
      res.status(500).render("register", {
        titulo: "Crear cuenta | Funkoshop",
        errors: {
          _form: {
            msg: "No se pudo crear la cuenta. Probá de nuevo o usá otro email.",
          },
        },
        oldBody: req.body || {},
      });
    }
  },
};

export default autController;
