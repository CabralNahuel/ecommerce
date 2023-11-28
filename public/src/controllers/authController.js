const autController = {
  getAuthLogin: (req, res) => res.render("login.ejs"),
  getAuthLogout: (req, res) => res.send("hola desde /auth/logout"),
  getAuthRegister: (req, res) => res.render("register"),
  postAuthLogin: (req, res) => res.send("hola desde post auth/login"),
  postAuthRegister: (req, res) => res.send("hola desde post /auth/register"),
};

export default autController;
