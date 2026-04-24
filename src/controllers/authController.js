import services from "../services/authServices.js";
import mainServices from "../services/mainServices.js";

const autController = {
  getAuthLogin: (req, res) => {
    res.render("login.ejs", {
      titulo: "LOGIN | Funkoshop",
      loginerror: "",
    });
  },

  getAuthLogout: (req, res) => res.send("hola desde /auth/logout"),

  getAuthRegister: (req, res) => {
    res.render("register", {
      titulo: "Crear cuenta | Funkoshop",
      errors: null,
      oldBody: null,
    });
  },

  postAuthLogin: async (req, res) => {
    const user = req.body;
    const { email } = user;
    const userDB = await services.getUserByEmail(email);
    
    if (userDB) {
      /* El modelo Users guarda la clave en el atributo `pass`, no `password`. */
      if (user.password === userDB.pass) {
          const loggeduser={id:userDB.id,email,name:userDB.name,admin:userDB.admin}
          req.session.loggeduser=loggeduser
          
          if (loggeduser.admin)
          {
            const titulo = "ADMIN";
            const cards = await mainServices.getProducts();
            res.render("admin", { titulo, cards });
          }
          else
          {
            const titulo = 'Home'
            const collections = await mainServices.getCollections()
            const cards = await mainServices.getProductByNewIN()
            res.render ('index', {titulo, collections, cards })
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
