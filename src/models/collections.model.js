import {sequelize} from '../config/conection.js';
import { Model,INTEGER,STRING} from 'sequelize';
import {Products, Categorys, Collections} from './asociations.js';


const postCollection = async (data) =>{
  const result = await Collections.create(data);
  return result;
};

const getCollections= async () =>{
  const data =  await Collections.findAll();
  return data;
};

const getCollection= async (id) =>{
  const data =  await Collections.findOne({ where : {id} });
  return data;
};

// const updCollection = async (id,data) => {
//   const result =  await Collections.update( data , { where : {id} });
//   return result[0];
// }

// const delCollection = async (id) =>{
//   const data =  await Collections.destroy({ where : {id} });
//   return data;
// };

const model={
  getCollections,
  getCollection,
  postCollection
};

export default model;