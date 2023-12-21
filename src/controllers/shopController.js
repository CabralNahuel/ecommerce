const product = [
  {
    product_id: 1,
    licence_name: "STARWARS",
    "category_name”": "Figuras coleccionables",
    product_name: "BABY YODA BLUEBALL",
    product_description: "Figura coleccionable Star Wars",
    product_price: 1799.99,
    dues: 10,
    product_sku: "STW001001",
    img_front: "/multimedia/star-wars/baby-yoda-1.webp",
    img_back: "/multimedia/star-wars/baby-yoda-box.webp",
  },
  {
    product_id: 2,
    licence_name: "STARWARS",
    category_name: "Figuras coleccionables",
    product_name: "BOBA FETT FIGHTER",
    product_description: "Figura coleccionable Star Wars",
    product_price: 1799.99,
    dues: 10,
    product_sku: "STW001002",
    img_front: "/multimedia/star-wars/bobbafeth-1.webp",
    img_back: "/multimedia/star-wars/bobbafeth-box.webp",
  },
  {
    product_id: 3,
    licence_name: "STARWARS",
    category_name: "Figuras coleccionables",
    product_name: "LUKE AND GROGU",
    product_description: "Figura coleccionable Star Wars",
    product_price: 1799.99,
    dues: 10,
    product_sku: "STW001003",
    img_front: "/multimedia/star-wars/luke-1.webp",
    img_back: "./multimedia/star-wars/luke-box.webp",
  },
  {
    product_id: 4,
    licence_name: "STARWARS",
    category_name: "Figuras coleccionables",
    product_name: "STORMTROPPER",
    product_description: "Figura coleccionable Star Wars",
    product_price: 1799.99,
    dues: 10,
    product_sku: "STW001004",
    img_front: "/multimedia/star-wars/trooper-1.webp",
    img_back: "/multimedia/star-wars/trooper-box.webp",
  },
  {
    product_id: 5,
    licence_name: "POKEMON",
    category_name: "Figuras coleccionables",
    product_name: "CHARMANDER",
    product_description: "Figura coleccionable pokemon",
    product_price: 1799.99,
    dues: 10,
    product_sku: "PKM001001",
    img_front: "/multimedia/pokemon/charmander-1.webp",
    img_back: "/multimedia/pokemon/charmander-box.webp",
  },
  {
    product_id: 6,
    licence_name: "POKEMON",
    category_name: "Figuras coleccionables",
    product_name: "DRAGONITE",
    product_description: "Figura coleccionable pokemon",
    product_price: 1799.99,
    dues: 10,
    product_sku: "PKM001002",
    img_front: "/multimedia/pokemon/dragonite-1.webp",
    img_back: "/multimedia/pokemon/dragonite-box.webp",
  },
  {
    product_id: 7,
    licence_name: "POKEMON",
    category_name: "Figuras coleccionables",
    product_name: "PIDGEOTTO",
    product_description: "Figura coleccionable pokemon",
    product_price: 1799.99,
    dues: 10,
    product_sku: "PKM001003",
    img_front: "/multimedia/pokemon/pidgeotto-1.webp",
    img_back: "/multimedia/pokemon/pidgeotto-box.webp",
  },
  {
    product_id: 8,
    licence_name: "POKEMON",
    category_name: "Figuras coleccionables",
    product_name: " PIKACHU",
    product_description: "Figura coleccionable pokemon",
    product_price: 1799.99,
    dues: 10,
    product_sku: "PKM001004",
    img_front: "/multimedia/pokemon/pikachu-1.webp",
    img_back: "/multimedia/pokemon/pikachu-box.webp",
  },
  {
    product_id: 9,
    licence_name: "POKEMON",
    category_name: "Figuras coleccionables",
    product_name: "VULPIX",
    product_description: "Figura coleccionable pokemon",
    product_price: 1799.99,
    dues: 10,
    product_sku: "PKM001005",
    img_front: "/multimedia/pokemon/vulpix-1.webp",
    img_back: "/multimedia/pokemon/vulpix-box.webp",
  },
  {
    product_id: 10,
    licence_name: "HARRY POTTER",
    category_name: "Figuras coleccionables",
    product_name: "HARRY",
    product_description: "Figura coleccionable harry potter",
    product_price: 1799.99,
    dues: 10,
    product_sku: "HPT001001",
    img_front: "/multimedia/harry-potter/harry-1.webp",
    img_back: "/multimedia/harry-potter/harry-box.webp",
  },
  {
    product_id: 11,
    licence_name: "HARRY POTTER",
    category_name: "Figuras coleccionables",
    product_name: "HERMIONE",
    product_description: "Figura coleccionable harry potter",
    product_price: 1799.99,
    dues: 10,
    product_sku: "HPT001002",
    img_front: "/multimedia/harry-potter/hermione-1.webp",
    img_back: "/multimedia/harry-potter/hermione-box.webp",
  },
  {
    product_id: 12,
    licence_name: "HARRY POTTER",
    category_name: "Figuras coleccionables",
    product_name: "LUNA",
    product_description: "Figura coleccionable harry potter",
    product_price: 1799.99,
    dues: 10,
    product_sku: "HPT001003",
    img_front: "/multimedia/harry-potter/luna-1.webp",
    img_back: "/multimedia/harry-potter/luna-box.webp",
  },
  {
    product_id: 13,
    licence_name: "HARRY POTTER",
    category_name: "Figuras coleccionables",
    product_name: "SNAPE PATRONUS",
    product_description: "Figura coleccionable harry potter",
    product_price: 1799.99,
    dues: 10,
    product_sku: "HPT001004",
    img_front: "/multimedia/harry-potter/snape-patronus-1.webp",
    img_back: "/multimedia/harry-potter/snape-patronus-box.webp",
  },
];

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

  getShopCart: async (req, res) => {
    const titulo = "CARRITO";
    //const selected = services.ge
    res.render("carrito", { titulo, product });
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

  postShopItemIdAdd: (req, res) => {
    console.log("-------------------------------------postshop item add");

    const product_id = req.params.product_id;
    if (req.sesssion.userID) {
      const id = req.sesssion.userID;
    } else {
      // pedir al usuari que se loguue
    }
    console.log(id, product_id, req.body.quantity);
    console.log(req.body);
    res.send("hola desde post /shop/item/:id/add");
  },
};

export default shopController;
