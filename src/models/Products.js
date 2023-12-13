import { sequelize } from "../config/conection.js";
import { Model, INTEGER, FLOAT, STRING, BOOLEAN, Op } from "sequelize";

export class Products extends Model {}

Products.init(
  {
    product_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: { type: STRING(100), allowNull: false },
    product_description: { type: STRING(255), allowNull: false },
    product_price: { type: FLOAT, allowNull: false },
    product_stock: { type: INTEGER, allowNull: false },
    product_sku: { type: STRING(10), allowNull: false },
    dues: { type: INTEGER, allowNull: false },
    img_front: { type: STRING(255), allowNull: false },
    img_back: { type: STRING(255), allowNull: false },
    new_in: { type: BOOLEAN, allowNull: false }, //TINYINT(1)
    categoryId: { type: INTEGER, allowNull: false, foreignKey: true },
    collectionId: { type: INTEGER, allowNull: false, foreignKey: true },
  },
  {
    sequelize,
    modelName: "products",
    timestamps: false,
  }
);
