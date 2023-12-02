import {sequelize} from '../config/conection.js';
import { Model,INTEGER,FLOAT,STRING,Op} from 'sequelize';


class Products extends Model{}

Products.init({
  product_id  : {type:INTEGER, allowNull:false, primaryKey:true, autoIncrement:true},
  licence_name : {type:STRING, allowNull:false},
  category_name : {type:STRING, allowNull:false},
  product_name : {type:STRING, allowNull:false},
  product_description : {type:STRING, allowNull:false},
  product_price : {type:FLOAT, allowNull:false},
  dues : {type:INTEGER, allowNull:false},
  product_sku : {type:STRING, allowNull:false},
  img_front : {type:STRING, allowNull:false},
  img_back : {type:STRING, allowNull:false},
  new_in : {type:INTEGER, allowNull:false},
  collection : {type:INTEGER, allowNull:false},
  collection_name : {type:STRING, allowNull:true},
  collection_description : {type:STRING, allowNull:true}
},
{ 
  sequelize,
  modelName:'products', 
  timestamps:false
})

const postProducts = async (data) =>{
    const result = await Products.create(data);
    return result;
};

const getProducts= async () =>{
  const data =  await Products.findAll();
  return data;
};


const getProduct= async (product_id) =>{
  const data =  await Products.findOne({ where : {product_id} });
  return data;
};

const getProductByNewIN = async() => {
  const result =  await Products.findAll( 
    {
        where : {
          new_in: { [Op.eq]: 1} 
      }
    });
    return result;
}
const getProductInCollection = async() => {
  const result =  await Products.findAll( 
    {
        where : {
          collection: { [Op.eq]: 1} 
      }
    });
  return result;
}


const updProduct = async (product_id,data) => {
  const result =  await Products.update( data , { where : {product_id} });
  return result[0];
}

const delProduct = async (product_id) =>{
  const data =  await Products.destroy({ where : {product_id} });
  return data;
};

const model={
    getProducts,
    getProduct,
    postProducts,
    delProduct,
    updProduct,
    getProductByNewIN,
    getProductInCollection
};

export default model;
