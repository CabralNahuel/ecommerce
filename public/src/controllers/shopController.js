const shopController = {
  getShop: (req, res) => res.send("hola desde /shop"),
  getShopItemId: (req, res) => res.send("hola desde shop/item/:id"),
  getShopCart: (req, res) => res.send("hola desde shop/cart"),
  postShopCart: (req, res) => res.send("hola desde post shop/cart"),
  postShopItemIdAdd: (req, res) =>
    res.send("hola desde post /shop/item/:id/add"),
};

export default shopController;
