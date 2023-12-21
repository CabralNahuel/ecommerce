import { Products } from "./Products.js";
import { Categorys } from "./Categorys.js";
import { Collections } from "./Collections.js";
import { Users } from "./Users.js";
import { Carts } from "./Cart.js";

// definicion de relaciones m-1

Products.belongsTo(Categorys, { foreignKey: "categoryId" });
Categorys.hasMany(Products, { foreignKey: "categoryId" });

Products.belongsTo(Collections, { foreignKey: "collectionId" });
Collections.hasMany(Products, { foreignKey: "collectionId" });

// definicion de relaciones m-m  de users y products a travez de la tabla cart
Users.belongsToMany(Products, { through: "Carts" });
Products.belongsToMany(Users, { through: "Carts" });
Carts.belongsTo(Products, { foreignKey: "product_id" });
Carts.belongsTo(Users, { foreignKey: "users_id" });

export { Products, Categorys, Collections, Users, Carts }; // Exportar los modelos individualmente
