import model from '../models/Products.js'

const getProducts = async (req, res) => {
    const result = await model.getProducts();
    const data=[]
    result.forEach(element => {
        data.push(element.dataValues)
    });
    return data;
}

const getProduct = async (product_id) => {
    product_id = parseInt(product_id)
    const result = await model.getProduct(product_id)
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
    const result= await model.getProductByNewIN();
    const data=[]
    result.forEach(element => {
        data.push(element.dataValues)
    });
    return data;
}

const getProductInCollection = async (req,res) => {
    const result= await model.getProductInCollection()
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
    getProductInCollection
    
}

export default mainServices;