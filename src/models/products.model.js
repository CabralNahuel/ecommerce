import { sequelize } from "../config/conection.js";
import { Model, Op } from "sequelize";
import { Products, Categorys, Collections } from "./asociations.js";

const postProducts = async (data) => {
  //ojo con las fk
  try {
    const result = await Products.create(data);
    return result;
  } catch (error) {
    console.log(`error en productsModel al acceder a tabla ${error}`);
  }
};

const getProducts = async () => {
  try {
    const data = await Products.findAll({
      include: [Categorys, Collections],
    });
    return data;
  } catch (error) {
    console.log(`error en productsModel al acceder a tabla ${error}`);
  }
};

const getProduct = async (product_id) => {
  try {
    const data = await Products.findOne({
      where: { product_id },
      include: [Categorys, Collections],
    });
    // console.log('------- data------------------------------------- ')
    // console.log(data.product_id)
    // console.log(data.product_name)
    // console.log(data.category.category_name)
    // console.log(data.collection.collection_description)
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProductByNewIN = async () => {
  try {
    const result = await Products.findAll({
      where: { new_in: { [Op.eq]: true } },
      include: [Categorys, Collections],
    });
    return result;
  } catch (error) {
    console.log(`error en productsModel al acceder a tabla ${error}`);
  }
};

const updProduct = async (product_id, data) => {
  const result = await Products.update(data, { where: { product_id } });
  return result[0];
};

const delProduct = async (product_id) => {
  const data = await Products.destroy({ where: { product_id } });
  return data;
};

const model = {
  getProducts,
  getProduct,
  postProducts,
  delProduct,
  updProduct,
  getProductByNewIN,
};

export default model;
