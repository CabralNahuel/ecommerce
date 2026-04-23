import {Sequelize} from 'sequelize';
//import mysql from 'mysql2'
import dotenv from 'dotenv' 

dotenv.config();

const dbHost = process.env.DB_HOST || process.env.HOST;
const dbUser = process.env.DB_USER || process.env.USER;
const dbPass = process.env.DB_PASS || process.env.PASS;
const dbName = process.env.DB_NAME || process.env.DATABASE;
const dbPort = process.env.DB_PORT || process.env.MYSQLPORT;

export const sequelize= new Sequelize({
    dialect:'mysql',
    host: dbHost, 
    username: dbUser ,
    password: dbPass ,
    database: dbName ,
    port : dbPort, 
    pool:{ max:10,min:0,}
});

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


