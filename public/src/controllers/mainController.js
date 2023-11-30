import services from '../services/mainServices.js'


const mainController = {
  home: async (req, res) => {
    const titulo = 'Home'
    const collections = await services.getProductInCollection()
    const cards = await services.getProductByNewIN()
    res.render ('index.ejs', {titulo, collections, cards})
  },
  contact: (req, res) => res.render("contact.ejs"),
  about: (req, res) => res.send("hola desde about"),
  faqs: (req, res) => res.send("hola desde faqs"),
};

export default mainController;
