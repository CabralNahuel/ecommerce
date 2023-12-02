const autController = {
  getAuthLogin: (req, res) => {
    const titulo = 'LOGIN'
    res.render("login.ejs",{titulo})
  },
  getAuthLogout: (req, res) => res.send("hola desde /auth/logout"),
  getAuthRegister: (req, res) => {
    const titulo = 'REGISTER'
    res.render("register",{titulo})
  },
  postAuthLogin: (req, res) => res.send("hola desde post auth/login"),
  postAuthRegister: (req, res) => res.send("hola desde post /auth/register"),
};

export default autController;
