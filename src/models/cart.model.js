import {sequelize} from '../config/conection.js';
import {Model,Op} from 'sequelize';
import {Categorys, Collections, Users, Carts, Products} from './asociations.js';

const postCart = async (data) =>{
    try {
        const result = await Carts.create(data);
        return result;
    } 
    catch (error) {
        console.log(`error en CartsModel al acceder a tabla ${error}`);
    }
};

const getCarts = async () =>{
    
    try {
        const data =  await Carts.findAll({
            include:[Categorys,Collections,Users,Products]
        });
        return data;
    }
    catch (error) {
        console.log(`error en CartsModel al acceder a tabla ${error}`);
    }
};

const getCart = async (cart_id) => {
    try{
        const data = await Carts.findOne({
            where: { cart_id },
            include:[Users,Products,Categorys,Collections]
        });
        return data;
    }
    catch (error) {
        console.log(error);
    }  };

    const getCartByUser = async(users_id) => {
        try {
            //const cart_delivered=false
            const result =  await Carts.findAll( 
                {  where : {users_id} ,
                    include:[ Users,Products]   
                }
                );
            return result;
        } 
        catch (error) {
            console.log(`error en CartsModel al acceder a tabla ${error}`);
        }
    }

const updCart = async (cart_id,data) => {
    const result =  await Carts.update( data , { where : {cart_id} });
    return result[0];
}

const delCart = async (cart_id) =>{
    const data =  await Carts.destroy({ where : {cart_id} });
    return data;
};

const model={
    getCarts,
    getCart,
    postCart,
    delCart,
    updCart,
    getCartByUser
};

export default model;
