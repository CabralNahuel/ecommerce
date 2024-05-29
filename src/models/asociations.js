import { Products } from "./Products.js";
import { Categorys } from "./Categorys.js";
import { Collections } from "./Collections.js";
import { Users } from "./Users.js";
import { Carts } from "./Cart.js";

// Definición de relaciones 1-M
Products.belongsTo(Categorys, { foreignKey: "categoryId" });
Categorys.hasMany(Products, { foreignKey: "categoryId" });

Products.belongsTo(Collections, { foreignKey: "collectionId" });
Collections.hasMany(Products, { foreignKey: "collectionId" });

// Definición de relaciones M-M entre Users y Products a través de la tabla Cart
Users.belongsToMany(Products, { through: Carts, foreignKey: "users_id", otherKey: "product_id" });
Products.belongsToMany(Users, { through: Carts, foreignKey: "product_id", otherKey: "users_id" });

Carts.belongsTo(Products, { foreignKey: { name: "product_id", allowNull: false } });
Carts.belongsTo(Users, { foreignKey: { name: "users_id", allowNull: false } });

export { Products, Categorys, Collections, Users, Carts };
