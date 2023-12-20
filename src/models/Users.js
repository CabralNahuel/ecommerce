import { sequelize } from "../config/conection.js";
import { Model, INTEGER, FLOAT, STRING, Op } from "sequelize";

export class Users extends Model {}

Users.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: STRING, allowNull: false },
    last_name: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false },
    pass: { type: STRING, allowNull: false },
    admin: { type: INTEGER, allowNull: false, defaultValue: 0 },
    recordame: { type: INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: false,
  }
);
