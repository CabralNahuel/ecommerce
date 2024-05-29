import { sequelize } from '../config/conection.js';
import { Model, INTEGER, FLOAT, DATE, BOOLEAN } from 'sequelize';

export class Carts extends Model {}

Carts.init({
  cart_id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true },
  product_id: { type: INTEGER, allowNull: false, foreignKey: true },
  users_id: { type: INTEGER, allowNull: false, foreignKey: true },
  cart_quantity: { type: INTEGER, allowNull: false },
  cart_price: { type: FLOAT, allowNull: false },
  cart_total_price: { type: FLOAT, allowNull: false },
  cart_date: { type: DATE, allowNull: false },
  cart_delivered: { type: BOOLEAN, allowNull: false },
  cart_delivered_date: { type: DATE, allowNull: true }
}, 
{
  sequelize,
  modelName: 'carts',
  timestamps: false
});