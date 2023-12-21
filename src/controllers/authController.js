import services from "../services/authServices.js";
import mainServices from "../services/mainServices.js";

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
    const { email } = user;
    const userDB = await services.getUserByEmail(email);
    
    if (userDB) {
      if (user.password === userDB.password) {
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
        res.send("el password no coincide me quedo en login");
        const titulo = 'LOGIN'
        const loginerror= "Usuario o Password no coincide"
        res.render("login.ejs",{titulo,loginerror})
      }
    } 
    else {
      //res.send("usuario no encontrado voy al register para registrarse");
      const titulo = 'REGISTER'
      res.render("register",{titulo})
    }
  },

  postAuthRegister: async (req, res) => {
    console.log(req.body);
    const newUser = req.body;
    const data = await services.postUser(newUser);
    // actualizo la base de datos y voy al login
    const titulo = "LOGIN";
    const loginerror= ""
    res.render("login", { titulo, loginerror});
  },
};

export default autController;
