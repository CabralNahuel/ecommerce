import services from '../services/mainServices.js'

const shopController = {
  getShop: async (req, res) => {
    const titulo='Funkoshop'
    const cards = await services.getProducts()
    res.render("shop", {titulo, cards})
  },
  
  getShopItemId: async (req, res) =>{
    const titulo="ITEM"
    const funko =  await services.getProduct(req.params.product_id)
    const cards = await services.getProductByNewIN()
    res.render("item",{titulo,funko,cards})
  },
  

  getShopCart: async (req, res) =>  {
    const titulo='CARRITO'
    //const selected = services.ge
    res.render("carrito", {titulo})
  },

  postShopCart: (req, res) => res.send("hola desde post shop/cart"),

  postShopItemIdAdd: (req, res) => res.send("hola desde post /shop/item/:id/add"),

};

export default shopController;
