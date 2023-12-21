import services from "../services/mainServices.js";
import model from "../models/products.model.js";

const adminController = {
  getAdmin: async (req, res) => {
    const titulo = "ADMIN";
    const cards = await services.getProducts();

    res.render("admin", { titulo, cards });
  },
  getAdminCreate: async (req, res) => {
    const titulo = "CREATE";
    const cards = await services.getProducts();
    const collection = await services.getCollections();
    const categorys = await services.getCategory();

    res.render("create", { titulo, cards, collection, categorys });
  },
  getAdminEditId: async (req, res) => {
    const titulo = "EDIT";
    const product_id = req.params.id;
    const producto = await services.getProduct(product_id);
    const collection = await services.getCollections();
    const categorys = await services.getCategory();

    res.render("edit", { titulo, producto, collection, categorys });
  },
  // postAdminCreate: (req, res) => mainServices.postProducts(),
  putAdminEditId: (req, res) => res.send("hola desde put /admin/edit/:id"),
  deleteAdminDeleteId: async (req, res) => {
    const product_id = parseInt(req.params.id);
    try {
      const result = await model.delProduct(product_id);
      console.log("producto eliminado correctamente");
    } catch (error) {
      console.error(error);
      console.log("no se pudo eliminar el producto");
    }
  },
};

export default adminController;
