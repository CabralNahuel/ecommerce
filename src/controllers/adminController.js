const adminController = {
  getAdmin: (req, res) => res.send("hola desde /admin"),
  getAdminCreate: (req, res) => res.send("hola desde /admin/create"),
  getAdminEditId: (req, res) => res.send("hola desde /admin/edit/:id"),
  postAdminCreate: (req, res) => res.send("hola desde post /admin/create"),
  putAdminEditId: (req, res) => res.send("hola desde put /admin/edit/:id"),
  deleteAdminDeleteId: (req, res) =>
    res.send("hola desde delete /admin/delete/:id"),
};

export default adminController;
