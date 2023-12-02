import {Sequelize} from 'sequelize';
//import mysql from 'mysql2'
import dotenv from 'dotenv' 

dotenv.config();

export const sequelize= new Sequelize({
    dialect:'mysql',
    host: process.env.HOST || 'localhost',
    username: process.env.USER || 'root',
    password: process.env.PASS || 'hepatalgina',
    database: process.env.DATABASE || 'funkoshop',
    port : process.env.MYSQLPORT || 3306,
    pool:{ max:10,min:0,}
});

export const dbConect = () => {
    sequelize.authenticate()
    .then(()=>console.log('Establecio la conexion'))
    .catch((err) => {console.error('No se pudo Conectar',err)})
}


