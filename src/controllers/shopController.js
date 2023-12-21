import services from "../services/mainServices.js";
import shopServices from "../services/shopServices.js";

const shopController = {
  getShop: async (req, res) => {
    const titulo = "Funkoshop";
    const cards = await services.getProducts();
    res.render("shop", { titulo, cards });
  },


  getShopItemId: async (req, res) => {
    const titulo = "ITEM";
    const funko = await services.getProduct(req.params.product_id);
    const cards = await services.getProductByNewIN();
    res.render("item", { titulo, funko, cards });
  },
  
  delShopItemId: async (req, res) => {
      if (req.session.loggeduser) {
        const {id}= req.session.loggeduser;
        const titulo = "CARRITO";
        const result = await shopServices.delShopItemId(req.params.cart_id)
        const carrito = await shopServices.getCartByUser(id)
        const cantCart =carrito.length
        res.render("carrito" , {titulo, carrito})
      } 
      else {
        const titulo="pagina de error"
        const error={msj:"El usuario debe estar logueado"}
        res.render("error", { titulo, error });
      }
    },

  getShopCart: async (req, res) => {
    const titulo = "CARRITO";
    //const selected = services.ge
    res.render("carrito", { titulo, product });
  },
  getShopCart: async (req, res) => {
    if (req.session.loggeduser) {
      const {id}= req.session.loggeduser;
      const titulo = "CARRITO";
      const carrito = await shopServices.getCartByUser(id)
      const cantCart = carrito.length
      console.log('---------------------------------------carrito');
      console.log(carrito);
      res.render("carrito" , {titulo, carrito})
    } 
    else {
       const titulo="pagina de error"
       const error={msj:"El usuario debe estar logueado"}
       res.render("error", { titulo, error });
    }
  },

  postShopCart: async (req, res) => {
    //const {quantity,price} = req.body
    const quantity = 10;
    const id = 6;
    const product_id = 3;
    const productData = await shopServices.postShopCart(
      product_id,
      id,
      quantity
    );
    res.send(productData);
  },

  postShopItemIdAdd: async (req, res) => {
    console.log("-------------------------------------postshop item add");
    const quantity = req.body.quantity
    console.log(quantity);
    const product_id = parseInt(req.params.product_id);
    if (req.session.loggeduser) {
      const {id}= req.session.loggeduser;
      const data= await shopServices.postShopCartItem(product_id, id, quantity)
      const titulo = "Funkoshop";
      const cards = await services.getProducts();
      res.render("shop", { titulo, cards })
    } 

    else {
      const titulo="pagina de error"
      const error={msj:"El usuario debe estar logueado"}
      res.render("error", { titulo, error });
    }
  },
};

export default shopController;
