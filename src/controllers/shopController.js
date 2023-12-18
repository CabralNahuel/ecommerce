import services from '../services/mainServices.js'
import shopServices from '../services/shopServices.js'
import authServices from '../services/authServices.js'


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

  postShopCart: async (req, res) => {
      //const {quantity,price} = req.body
      const quantity=10
      const id = 6 
      const product_id=3
      const productData = await shopServices.postShopCart(product_id, id,quantity)
      res.send(productData)
  },

  postShopItemIdAdd: (req, res) =>  {
    console.log('-------------------------------------postshop item add');
    
    const product_id=req.params.product_id
    if (req.sesssion.userID) {
      const id=req.sesssion.userID
    }
    else{
      // pedir al usuari que se loguue
    }
    console.log(id,product_id,req.body.quantity)
    console.log(req.body);
    res.send("hola desde post /shop/item/:id/add")
  },


};

export default shopController;
