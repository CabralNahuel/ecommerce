import productModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";
import cartModel from "../models/cart.model.js";


const postShopCartItem = async (product_id, id, quantity) => {
  id = parseInt(id);
  product_id = parseInt(product_id);
  quantity = parseInt(quantity);
  const user = await usersModel.getUser(parseInt(id));
  const product = await productModel.getProduct(product_id);
  const price = product.product_price;
  const data = {
    product_id: product_id,
    users_id: id,
    cart_quantity: quantity,
    cart_price: price,
    cart_total_price: quantity * price,
    cart_date: new Date(),
    cart_delivered: false,
    cart_delivered_date: null,
    product_license: product.collection.collection_license,
  };
  const result = await cartModel.postCart(data);
  return result;
};

const delShopItemId = async (id) => {
  const cart_id = parseInt(id)
  const result= await cartModel.delCart(cart_id)
  console.log('shopservices');
  console.log(result);
  return result
}

const getCartByUser = async (id) => {
  const users_id = parseInt(id);
  const result= await cartModel.getCartByUser(users_id)
  const data = result ? result.map((element) => element.dataValues) : [];
  console.log('--------------------cartby user services data');
  console.log(data);
  return data;
};
const shopServices = {
  postShopCartItem,
  getCartByUser,
  delShopItemId
};

export default shopServices;
