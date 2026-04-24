import { Op, Sequelize } from "sequelize";
import { sequelize } from "../config/conection.js";
import { Products, Categorys, Collections } from "./asociations.js";

const SHOP_PAGE_SIZE = 12;

/** Escapa % y _ para LIKE en MySQL */
const escapeLike = (s) =>
  String(s).replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");

/** LOWER(columna) LIKE patrón (patrón ya en minúsculas, con %) */
const lowerLike = (qualifiedCol, patternLower) =>
  Sequelize.where(
    Sequelize.fn("LOWER", Sequelize.col(qualifiedCol)),
    Op.like,
    patternLower
  );

const postProducts = async (data) => {
  //ojo con las fk
  try {
    const result = await Products.create(data);
    return result;
  } catch (error) {
    console.log(`error en productsModel al acceder a tabla ${error}`);
  }
};

const getProducts = async () => {
  try {
    const data = await Products.findAll({
      include: [Categorys, Collections],
    });
    return data;
  } catch (error) {
    console.log(`error en productsModel al acceder a tabla ${error}`);
  }
};

/**
 * Shop: filtros + paginación (máx. SHOP_PAGE_SIZE por página).
 */
const findShopProducts = async (query = {}) => {
  try {
    const limit = SHOP_PAGE_SIZE;
    const pageRaw = parseInt(String(query.page || "1"), 10);
    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
    const offset = (page - 1) * limit;

    const orderMap = {
      AZ: [["product_name", "ASC"]],
      ZA: [["product_name", "DESC"]],
      Mayor: [["product_price", "DESC"]],
      Menor: [["product_price", "ASC"]],
    };
    const baseOrder = orderMap[query.orderby] || [["product_name", "ASC"]];

    const where = {};

    const search = String(query.search || "").trim();
    let likePattern = "";
    let prefixPattern = "";
    if (search) {
      const inner = escapeLike(search.toLowerCase());
      likePattern = `%${inner}%`;
      prefixPattern = `${inner}%`;
      where[Op.or] = [
        lowerLike("products.product_name", likePattern),
        lowerLike("products.product_description", likePattern),
        lowerLike("collection.collection_license", likePattern),
        lowerLike("collection.collection_name", likePattern),
        lowerLike("category.category_name", likePattern),
      ];
    }

    let order = baseOrder;
    if (search && likePattern) {
      const pLike = sequelize.escape(likePattern);
      const pPrefix = sequelize.escape(prefixPattern);
      order = [
        [
          sequelize.literal(`(
            CASE
              WHEN LOWER(\`products\`.\`product_name\`) LIKE ${pPrefix} THEN 0
              WHEN LOWER(\`products\`.\`product_name\`) LIKE ${pLike} THEN 1
              WHEN LOWER(\`products\`.\`product_description\`) LIKE ${pLike} THEN 2
              WHEN LOWER(\`collection\`.\`collection_license\`) LIKE ${pLike}
                OR LOWER(\`collection\`.\`collection_name\`) LIKE ${pLike} THEN 3
              WHEN LOWER(\`category\`.\`category_name\`) LIKE ${pLike} THEN 4
              ELSE 5
            END
          )`),
          "ASC",
        ],
        ...baseOrder,
      ];
    }

    if (query.nuevos === "1" || query.nuevos === "on") {
      where.new_in = true;
    }

    const collectionIdRaw = query.collection_id ?? query.collection;
    const collectionId = parseInt(String(collectionIdRaw ?? "").trim(), 10);
    if (Number.isFinite(collectionId) && collectionId > 0) {
      where.collectionId = collectionId;
    }

    const minP = parseFloat(String(query.price_min ?? "").replace(",", "."), 10);
    const maxP = parseFloat(String(query.price_max ?? "").replace(",", "."), 10);
    if (!Number.isNaN(minP) && !Number.isNaN(maxP) && maxP >= minP && minP >= 0) {
      where.product_price = { [Op.between]: [minP, maxP] };
    } else if (!Number.isNaN(minP) && minP >= 0) {
      where.product_price = { [Op.gte]: minP };
    } else if (!Number.isNaN(maxP) && maxP >= 0) {
      where.product_price = { [Op.lte]: maxP };
    }

    const queryOpts = {
      where,
      include: [
        { model: Categorys, required: false },
        { model: Collections, required: false },
      ],
      order,
      limit,
      offset,
      distinct: true,
      col: "product_id",
      subQuery: false,
    };

    let rows;
    let count;
    try {
      const res = await Products.findAndCountAll(queryOpts);
      rows = res.rows;
      count = res.count;
    } catch (err) {
      console.log("findShopProducts (con búsqueda en relaciones):", err.message);
      if (search && likePattern) {
        const whereSimple = { ...where };
        delete whereSimple[Op.or];
        whereSimple[Op.or] = [
          lowerLike("products.product_name", likePattern),
          lowerLike("products.product_description", likePattern),
        ];
        const res2 = await Products.findAndCountAll({
          ...queryOpts,
          where: whereSimple,
        });
        rows = res2.rows;
        count = res2.count;
      } else {
        throw err;
      }
    }

    const total = typeof count === "number" ? count : count.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      rows,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error) {
    console.log(`error en findShopProducts: ${error}`);
    return { rows: [], total: 0, page: 1, limit: SHOP_PAGE_SIZE, totalPages: 1 };
  }
};

const getProduct = async (product_id) => {
  try {
    const data = await Products.findOne({
      where: { product_id },
      include: [Categorys, Collections],
    });
    // console.log('------- data------------------------------------- ')
    // console.log(data.product_id)
    // console.log(data.product_name)
    // console.log(data.category.category_name)
    // console.log(data.collection.collection_description)
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProductByNewIN = async () => {
  try {
    const result = await Products.findAll({
      where: { new_in: { [Op.eq]: true } },
      include: [Categorys, Collections],
    });
    return result;
  } catch (error) {
    console.log(`error en productsModel al acceder a tabla ${error}`);
  }
};

const updProduct = async (product_id, data) => {
  const result = await Products.update(data, { where: { product_id } });
  return result[0];
};

const delProduct = async (product_id) => {
  const data = await Products.destroy({ where: { product_id } });
  return data;
};

const model = {
  getProducts,
  getProduct,
  postProducts,
  delProduct,
  updProduct,
  getProductByNewIN,
  findShopProducts,
};

export default model;
