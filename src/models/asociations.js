import {Products} from './Products.js';
import {Categorys} from './Categorys.js';
import {Collections} from './Collections.js';
import Users from './Users.js'

// definicion de relaciones m-1

Products.belongsTo(Categorys, {foreignKey : 'categoryId'})
Categorys.hasMany(Products,{foreignKey : 'categoryId'})

Products.belongsTo(Collections, {foreignKey : 'collectionId'})
Collections.hasMany(Products,{foreignKey : 'collectionId'})

const asociatedModels = { Products, Categorys, Collections, Users}

export { Products, Categorys, Collections, Users };  // Exportar los modelos individualmente
