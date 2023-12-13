import {Sequelize} from 'sequelize';
//import mysql from 'mysql2'
import dotenv from 'dotenv' 

dotenv.config();

export const sequelize= new Sequelize({
    dialect:'mysql',
    host: process.env.HOST || 'localhost',
    username: process.env.USER || 'root',
    password: process.env.PASS || '',
    database: process.env.DATABASE || 'funkoshop',
    port : process.env.MYSQLPORT || 3306,
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


