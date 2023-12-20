import {sequelize} from '../config/conection.js';
import { Model,Op} from 'sequelize';
import {Products, Categorys, Collections, Users, Carts} from './asociations.js';


const postUser = async (data) =>{
    const result = await Users.create(data);
    return result;
  };
  
  const getUsers= async () =>{
    const data =  await Users.findAll();
    return data;
  };
  
  const getUserByEmail= async (email) =>{
    const data =  await Users.findOne({ where : {email} });
    
    console.log(data);
    return data;
  }
  
  const getUser= async (id) =>{
    const data =  await Users.findOne({ where : {id} });
    return data;
  };
  
  const updUser = async (id,data) => {
    const result =  await Users.update( data , { where : {id} });
    return result[0];
  }
  
  const delUser = async (id) =>{
    const data =  await Users.destroy({ where : {id} });
    return data;
  };
  
  const model={
    getUsers,
    getUser,
    getUserByEmail,
    postUser,
    delUser,
    updUser,
  };
  
  export default model;