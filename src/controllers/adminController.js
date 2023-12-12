import services from "../services/mainServices.js";

const adminController = {
  getAdmin: async (req, res) => {
    const titulo = "ADMIN";
    const cards = await services.getProducts();

    res.render("admin", { titulo, cards });
  },
  getAdminCreate: async (req, res) => {
    const titulo = "CREATE";
    const cards = await services.getProducts();

    res.render("create", { titulo, cards });
  },
  getAdminEditId: (req, res) => res.send("hola desde /admin/edit/:id"),
  postAdminCreate: (req, res) => res.send("hola desde post /admin/create"),
  putAdminEditId: (req, res) => res.send("hola desde put /admin/edit/:id"),
  deleteAdminDeleteId: (req, res) =>
    res.send("hola desde delete /admin/delete/:id"),
};

export default adminController;
