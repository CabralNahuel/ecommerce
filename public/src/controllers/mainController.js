const mainController = {
  home: (req, res) => res.render("index.ejs"),
  contact: (req, res) => res.render("contact.ejs"),
  about: (req, res) => res.send("hola desde about"),
  faqs: (req, res) => res.send("hola desde faqs"),
};
export default mainController;
