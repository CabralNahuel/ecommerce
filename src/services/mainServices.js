import productModel from "../models/products.model.js";
import collectionModel from "../models/collections.model.js";
import categoryModel from "../models/category.model.js";

const getProducts = async (req, res) => {
  const result = await productModel.getProducts();
  const data = [];
  result.forEach((element) => {
    data.push(element.dataValues);
  });
  return data;
};

const getCollections = async (req, res) => {
  const result = await collectionModel.getCollections();
  const data = [];
  result.forEach((element) => {
    data.push(element.dataValues);
  });
  return data;
};

const getCategory = async (req, res) => {
  const result = await categoryModel.getCategorys();
  const data = [];
  result.forEach((element) => {
    data.push(element.dataValues);
  });
  return data;
};

const getProduct = async (product_id) => {
  product_id = parseInt(product_id);
  const result = await productModel.getProduct(product_id);
  console.log(result);
  return result.dataValues;
};

const postProducts = async (req, res) => {
  req.body.img_front = "/assets/imagenes/" + req.file.filename;

  const data = await productModel.postProducts(req.body);

  res.send("se agrego correctamente");
};

const updProduct = async (req, res) => {
  const produc_id = parseInt(req.params.id);

  const data = await productModel.updProduct(produc_id, req.body);
  res.send(data ? "se modifico" : "no se modifico");
};

const delProduct = async (req, res) => {
  const result = await productModel.delProduct(req.params.id);
  console.log(result);
  res.send(result ? "se borro" : "no se borro");
};

const getProductByNewIN = async (req, res) => {
  const result = await productModel.getProductByNewIN();
  const data = [];
  result.forEach((element) => {
    data.push(element.dataValues);
  });
  return data;
};

const mainServices = {
  getProduct,
  postProducts,
  delProduct,
  updProduct,
  getProductByNewIN,
  getCollections,
  getCategory,
  getProducts,
};

export default mainServices;
