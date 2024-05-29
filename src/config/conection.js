import {Sequelize} from 'sequelize';
//import mysql from 'mysql2'
import dotenv from 'dotenv' 

dotenv.config();

export const sequelize= new Sequelize({
    dialect:'mysql',
    host: process.env.HOST, 
    username: process.env.USER ,
    password: process.env.PASS ,
    database: process.env.DATABASE ,
    port : process.env.MYSQLPORT, 
    pool:{ max:10,min:0,}
});
console.log(sequelize)

export const dbConect = () => {
    sequelize.authenticate()
    .then(()=>console.log('Establecio la conexion'))
    .catch((err) => {console.error('No se pudo Conectar',err)})
}

export const dbCreate = () => {
    sequelize.sync({force:true})
    .then(()=>console.log('se borraron las tablas y se crearon de nuevo'))
    .catch((err) => {console.error('No se pudo borrar o crer la BD',err)})
}

export const dbSync = () => {
    sequelize.sync()
    .then(()=>console.log('se syncronizaron con BD'))
    .catch((err) => {console.error('No se pudo sincronizar BD',err)})
}


