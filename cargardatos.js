import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./src/config/conection.js";
import { Categorys } from "./src/models/Categorys.js";
import { Collections } from "./src/models/Collections.js";
import { Products } from "./src/models/Products.js";
import "./src/models/asociations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "funkos.json");

const normalizeText = (value, fallback = "") =>
  String(value ?? fallback).trim();

export const syncAndSeed = async () => {
  try {
    const rawJson = await fs.readFile(dataPath, "utf-8");
    const items = JSON.parse(rawJson);

    await sequelize.sync();

    for (const item of items) {
      const categoryName = normalizeText(item.category_name, "FUNKOS");
      const collectionLicense = normalizeText(item.licence_name, "GENERAL");

      const [category] = await Categorys.findOrCreate({
        where: { category_name: categoryName.toUpperCase() },
        defaults: {
          category_name: categoryName.toUpperCase(),
          category_description: `Categoria ${categoryName}`,
        },
      });

      const [collection] = await Collections.findOrCreate({
        where: { collection_license: collectionLicense.toUpperCase() },
        defaults: {
          collection_license: collectionLicense.toUpperCase(),
          collection_name: collectionLicense.toUpperCase(),
          collection_description: `Coleccion ${collectionLicense}`,
          collection_image: item.img_front,
        },
      });

      const productPayload = {
        product_name: normalizeText(item.product_name, "FUNKO"),
        product_description: normalizeText(
          item.product_description,
          "Figura coleccionable"
        ),
        product_price: Number(item.product_price) || 0,
        product_stock: Number(item.product_stock) || 10,
        product_sku: normalizeText(item.product_sku),
        dues: Number(item.dues) || 0,
        img_front: normalizeText(item.img_front),
        img_back: normalizeText(item.img_back),
        new_in: Boolean(item.new_in),
        categoryId: category.category_id,
        collectionId: collection.collection_id,
      };

      const existing = await Products.findOne({
        where: { product_sku: productPayload.product_sku },
      });

      if (existing) {
        await existing.update(productPayload);
      } else {
        await Products.create(productPayload);
      }
    }

    console.log("Seed finalizado correctamente desde funkos.json");
  } catch (error) {
    console.error("Error al cargar datos desde funkos.json:", error);
  } finally {
    await sequelize.close();
  }
};

if (process.argv[1] === __filename) {
  syncAndSeed();
}


