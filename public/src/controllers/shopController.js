const shopController = {
  getShop: (req, res) => res.render("shop.ejs"),
  getShopItemId: (req, res) => res.send("hola desde shop/item/:id"),
  getShopCart: (req, res) => res.render("carrito"),
  postShopCart: (req, res) => res.send("hola desde post shop/cart"),
  postShopItemIdAdd: (req, res) =>
    res.send("hola desde post /shop/item/:id/add"),
};

export default shopController;
