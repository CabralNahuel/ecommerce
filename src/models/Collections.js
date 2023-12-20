import {sequelize} from '../config/conection.js';
import { Model,INTEGER,STRING} from 'sequelize';

export class Collections extends Model{}

Collections.init({
  collection_id : {type:INTEGER, allowNull:false, primaryKey:true, autoIncrement:true},
  collection_license : {type:STRING(45), allowNull:false},
  collection_name : {type:STRING(100), allowNull:false},
  collection_description: {type:STRING(255), allowNull:false},
  collection_image :{type:STRING(255), allowNull:false}
},
{
  sequelize,
  modelName:'collections', 
  timestamps:false,
}
)


