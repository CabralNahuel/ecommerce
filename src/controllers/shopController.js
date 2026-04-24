import services from "../services/mainServices.js";
import shopServices from "../services/shopServices.js";
import productModel from "../models/products.model.js";
import collectionModel from "../models/collections.model.js";

const shopController = {
  getShop: async (req, res) => {
    const titulo = "Funkoshop";
    const { rows, total, page, limit, totalPages } =
      await productModel.findShopProducts(req.query);
    const cards = rows.map((r) => r.dataValues || r);
    const baseQuery = {};
    Object.entries(req.query).forEach(([key, val]) => {
      if (key === "page") return;
      if (val === undefined || val === null || String(val).trim() === "") return;
      baseQuery[key] = String(val);
    });

    let collectionFilter = null;
    const cid = parseInt(String(req.query.collection_id || "").trim(), 10);
    if (Number.isFinite(cid) && cid > 0) {
      try {
        const col = await collectionModel.getCollection(cid);
        if (col) {
          const v = col.dataValues || col;
          collectionFilter = {
            id: v.collection_id,
            name: v.collection_name,
          };
        }
      } catch (e) {
        /* ignorar */
      }
    }

    res.render("shop", {
      titulo,
      cards,
      pagination: { total, page, limit, totalPages },
      baseQuery,
      collectionFilter,
    });
  },


  getShopItemId: async (req, res) => {
    const funko = await services.getProduct(req.params.product_id);
    const titulo = funko?.product_name ? `${funko.product_name} | Funkoshop` : "Funkoshop";
    const cards = await services.getProductByNewIN();
    res.render("item", { titulo, funko, cards });
  },
  
  delShopItemId: async (req, res) => {
      if (req.session.loggeduser) {
        const {id}= req.session.loggeduser;
        const titulo = "Carrito | Funkoshop";
        await shopServices.delShopItemId(req.params.cart_id);
        const carrito = await shopServices.getCartByUser(id);
        res.render("carrito", { titulo, carrito });
      } 
      else {
        const titulo="pagina de error"
        const error={msj:"El usuario debe estar logueado"}
        res.render("error", { titulo, error });
      }
    },

  getShopCart: async (req, res) => {
    if (req.session.loggeduser) {
      const { id } = req.session.loggeduser;
      const titulo = "Carrito | Funkoshop";
      const carrito = await shopServices.getCartByUser(id);
      res.render("carrito", { titulo, carrito });
    } else {
      const titulo = "Error | Funkoshop";
      const error = { msj: "Tenés que iniciar sesión para ver el carrito." };
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
      await shopServices.postShopCartItem(product_id, id, quantity);
      res.redirect("/shop");
    } 

    else {
      const titulo="pagina de error"
      const error={msj:"El usuario debe estar logueado"}
      res.render("error", { titulo, error });
    }
  },
};

export default shopController;
