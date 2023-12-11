import {sequelize} from '../config/conection.js';
import { Model,Op} from 'sequelize';
import {Products, Categorys, Collections} from './asociations.js';

const postProducts = async (data) =>{
    //ojo con las fk
    try {
        const result = await Products.create(data);
        return result;
    } 
    catch (error) {
        console.log(`error en productsModel al acceder a tabla ${error}`);
    }
};

// const getProducts= async () =>{
//     try {
//         const data =  await Products.findAll({
//             include:[ Categorys,Collections]
//         });

//         return data;
//     } 
//     catch (error) {
//         console.log(`error en productsModel al acceder a tabla ${error}`);
//     }
// };

const getProducts= async () =>{
    
    try {
        console.log('....................productos.models..........')
        const data =  await Products.findAll({
            include:[Categorys,Collections]
        });
        
        // console.log('------- pepe------------------------------------- ')
        // console.log(data[0].dataValues)
        // console.log(data[0].category.dataValues)
        // console.log(data[0].collection.dataValues)
        // console.log(data[0].product_id)
        //  console.log(data[0].product_name)
        return data;
    }
    catch (error) {
        console.log(`error en productsModel al acceder a tabla ${error}`);
    }
};

// const getProduct = async (product_id) => {
//     try{
//         const product_attb=['product_id',' product_name','product_description',
//             'product_price','product_stock','dues','product_sku',
//             'img_front','img_back','new_in','categoryId','collectionId']
//         const category_attb=['category_id','category_id','category_description']
//         const collection_attb=['collection_id','collection_license','collection_name',
//                'collection_description','collection_image' ]

//         const data = await Products.findOne({
//             where: { product_id },
//             as: "product"
//             attributes : product_atributes,
//             include:[ 
//                 {
//                     Categorys,
//                     as : "product_Category",
//                     attributes: category_attb
//                 },
//                 {
//                     Collections,
//                     as: "product_Collection",
//                     attributes: collection_attb
//                 }
//             ]
//         });
//         let {product,product_Category,product_Collection} = data
//         console.log(product)
//         console.log(product_Category)
//         console.log(product_Collection)
//         return data;
//         }
//     catch (error) {
//         console.log(error);
//     }  };




const getProductByNewIN = async() => {
    try {
        const result =  await Products.findAll( 
            {
                where : { new_in: { [Op.eq]: true} },
                include:[ Categorys,Collections]   
            });
        return result;
    } 
    catch (error) {
        console.log(`error en productsModel al acceder a tabla ${error}`);
    }
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
    //getProduct,
    postProducts,
    delProduct,
    updProduct,
    getProductByNewIN
};

export default model;
