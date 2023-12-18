import {sequelize} from '../config/conection.js';
import { Model,INTEGER,STRING,Association} from 'sequelize';
import {Products, Categorys, Collections} from './asociations.js';



const postCategory = async (data) =>{
  const result = await Categorys.create(data);
  return result;
};

const getCategorys= async () =>{
  const data =  await Categorys.findAll();
  return data;
};

const getCategory= async (id) =>{
  const data =  await Categorys.findOne({ where : {id} });
  return data;
};

// const updCategory = async (id,data) => {
//   const result =  await Categorys.update( data , { where : {id} });
//   return result[0];
// }

// const delCategory = async (id) =>{
//   const data =  await Categorys.destroy({ where : {id} });
//   return data;
// };

const model={
  getCategorys,
  getCategory,
  postCategory
};

export default model;
