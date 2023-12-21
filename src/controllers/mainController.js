import services from "../services/mainServices.js";

const mainController = {
  home: async (req, res) => {
    // declaracion del contexto del render
    const titulo = "Home";
    const collections = await services.getCollections();
    const cards = await services.getProductByNewIN();
    res.render("index", { titulo, collections, cards });
  },

  contact: (req, res) => {
    const titulo = "CONTACTO";
    res.render("contact", { titulo });
  },
  about: (req, res) => res.send("hola desde about"),
  faqs: (req, res) => res.send("hola desde faqs"),
};

export default mainController;
