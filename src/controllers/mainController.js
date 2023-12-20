import services from "../services/mainServices.js";

const mainController = {
  home: async (req, res) => {
    // declaracion del contexto del render
    const titulo = "Home";
    const collections = await services.getCollections();
    const cards = await services.getProductByNewIN();

    // const data= await services.getProducts()
    //   console.log('------- pepe------------------------------------- ')
    //   console.log(data[0].category.dataValues)
    //   console.log(data[0].collection.dataValues)
    //   console.log(data[0].product_id)
    //   console.log(data[0].product_name)
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
