import services from '../services/mainServices.js'


const mainController = {
  home: async (req, res) => {
    // declaracion del contexto del render
      const titulo = 'Home'
      const collections = await services.getProductInCollection()
      const cards = await services.getProductByNewIN()
    res.render ('index', {titulo, collections, cards})
  },

  get1: async (req, res) => {
    // declaracion del contexto del render
      const product_id='1'
      const data = await services.getProduct(product_id)
      res.send(data)
  },

  contact: (req, res) => {
    const titulo = 'CONTACTO'
    res.render("contact", {titulo})
  },
  about: (req, res) => res.send("hola desde about"),
  faqs: (req, res) => res.send("hola desde faqs"),
};

export default mainController;
