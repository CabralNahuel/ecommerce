import productModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";
import cartModel from "../models/cart.model.js";

const postShopCart = async (product_id, id, quantity) => {
  id = parseInt(id);
  product_id = parseInt(product_id);
  quantity = parseInt(quantity);
  const user = await usersModel.getUser(parseInt(id));
  const product = await productModel.getProduct(product_id);
  console.log("---------*************--------------shopservices");
  const price = product.product_price;
  console.log(user.dataValues);
  console.log(product.dataValues);
  const data = {
    product_id: product_id,
    users_id: id,
    cart_quantity: quantity,
    cart_price: price,
    cart_total_price: quantity * price,
    cart_date: new Date(),
    cart_delivered: false,
    cart_delivered_date: null,
  };
  console.log(data);
  const result = await cartModel.postCart(data);
  console.log(result);
  return result;
};

const postShopCartItem = async (product_id, id, quantity) => {
  id = parseInt(id);
  product_id = parseInt(product_id);
  quantity = parseInt(quantity);
  const user = await usersModel.getUser(parseInt(id));
  const product = await productModel.getProduct(product_id);
  console.log("---------*************--------------shopservices");
  const price = product.product_price;
  console.log(user.dataValues);
  console.log(product.dataValues);
  const data = {
    product_id: product_id,
    users_id: id,
    cart_quantity: quantity,
    cart_price: price,
    cart_total_price: quantity * price,
    cart_date: new Date(),
    cart_delivered: false,
    cart_delivered_date: null,
  };
  console.log(data);
  const result = await cartModel.postCart(data);
  console.log(result);
  return result;
};

const shopServices = {
  postShopCart,
};

export default shopServices;
