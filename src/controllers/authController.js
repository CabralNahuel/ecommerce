import services from "../services/authServices.js";

const autController = {
  getAuthLogin: (req, res) => {
    const titulo = "LOGIN";
    res.render("login.ejs", { titulo });
  },

  getAuthLogout: (req, res) => res.send("hola desde /auth/logout"),

  getAuthRegister: (req, res) => {
    const titulo = "REGISTER";
    res.render("register", { titulo });
  },

  postAuthLogin: async (req, res) => {
    const user = req.body;
    console.log("-----------------------------------user");
    console.log(user);
    const { email } = user;
    const userDB = await services.getUserByEmail(email);

    if (userDB) {
      if (user.password === userDB.password) {
        if (userDB.recordarme === 1)
          res.send(
            " usuario registrado y recordable asi que taer el pass al input"
          );
        else res.send("usuario registrado vamos al index");
        // si el usuario existe y el password coincide ir al index con un HOLA ANDREA Y LOGAOUT en el header
        // const titulo = 'Home'
        // const collections = await mainServices.getProductInCollection()
        // const cards = await mainServices.getProductByNewIN()
        // const user = data
        // res.render ('index', {titulo, collections, cards, user})
      } else {
        res.send("el password no coincide me quedo en login");
        // const titulo = 'LOGIN'
        // res.render("login.ejs",{titulo})
      }
    } else {
      res.send("usuario no encontrado voy al register para registrarse");
      // const titulo = 'REGISTER'
      // res.render("register",{titulo})
    }
  },

  postAuthRegister: async (req, res) => {
    console.log(req.body);
    const newUser = req.body;
    const data = await services.postUser(newUser);
    // actualizo la base de datos y voy al login
    const titulo = "LOGIN";
    res.render("login", { titulo });
  },
};

export default autController;
