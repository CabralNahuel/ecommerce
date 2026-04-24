import services from "../services/authServices.js";
import mainServices from "../services/mainServices.js";

const autController = {
  getAuthLogin: (req, res) => {
    const titulo = "LOGIN";
    res.render("login.ejs", { titulo });
  },

  getAuthLogout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  },

  getAuthRegister: (req, res) => {
    const titulo = "REGISTER";
    res.render("register", { titulo });
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
      return res.redirect("/admin");
    }

    const userDB = await services.getUserByEmail(email);
    
    if (userDB) {
      if (pass === userDB.pass) {
          const loggeduser={id:userDB.id,email,name:userDB.name,admin:userDB.admin}
          req.session.loggeduser=loggeduser
          
          if (loggeduser.admin)
          {
            return res.redirect("/admin");
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
