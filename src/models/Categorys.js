import {sequelize} from '../config/conection.js';
import { Model,INTEGER,STRING,Association} from 'sequelize';


export class Categorys extends Model{}

Categorys.init({
  category_id : {type:INTEGER, allowNull:false, primaryKey:true, autoIncrement:true},
  category_name : {type:STRING(100), allowNull:false},
  category_description: {type:STRING(255), allowNull:false}
},
{
  sequelize,
  modelName:'categorys', 
  timestamps:false,
}
)











