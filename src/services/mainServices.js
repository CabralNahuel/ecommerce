import productModel from '../models/products.model.js'
import collectionModel from '../models/collections.model.js'
import categoryModel from '../models/category.model.js'

const getProducts = async (req, res) => {
    const result = await productModel.getProducts();
    const data=[]
    result.forEach(element => {
         data.push(element.dataValues)
    });
    return data;
}

const getCollections = async (req, res) => {
    const result = await collectionModel.getCollections();
    const data=[]
    result.forEach(element => {
        data.push(element.dataValues)
    });
    console.log('desde main services');
    console.log(data);
    return data;
}

const getProduct = async (product_id) => {
    product_id = parseInt(product_id)
    const result = await model.getProduct(product_id)
    console.log(result);
    return result.dataValues;
}


const postProducts = async (req,res)=>{
    console.log(req.body);
    const data = await model.postProducts(req.body);
    res.send(data);
}

const updProduct= async (req,res)=>{
    const data = await model.updProduct( req.params.id, req.body);
    res.send(data?"se modifico":"no se modifico");
}

const delProduct =  async (req, res) => {
    const result = await model.delProduct(req.params.id);
    console.log(result)
    res.send(result?"se borro":"no se borro")
}

const getProductByNewIN = async (req,res) => {
    const result= await productModel.getProductByNewIN();
    const data=[]
    result.forEach(element => {
        data.push(element.dataValues)
    });
    return data;
}



const mainServices ={
    getProduct,
    getProducts,
    postProducts,
    delProduct,
    updProduct,
    getProductByNewIN,
    getCollections
}

export default mainServices;