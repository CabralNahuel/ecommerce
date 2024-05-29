import { sequelize } from './src/config/conection.js';
import { Categorys } from './src/models/Categorys.js';
import { Collections } from './src/models/Collections.js';
import { Products } from './src/models/Products.js';

export const syncAndSeed = async () => {
  try {
    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync({ force: true });

    // Inserta datos iniciales
    await Categorys.bulkCreate([
      { category_id: 1, category_name: 'FUNKOS', category_description: 'Figuras Coleccionables' },
      { category_id: 2, category_name: 'REMERAS', category_description: 'Remeras con el Funko de tu eleccion' },
      { category_id: 3, category_name: 'LLAVEROS', category_description: 'Mágicos llaveros colleccionables' }
    ]);

    await Collections.bulkCreate([
      { collection_id: 1, collection_license: 'STARWARS', collection_name: 'STAR WARS & THE MANDALORIAN', collection_description: 'Disfruta de una saga que sigue agregando personajes a su colección.', collection_image: '/multimedia/star-wars/baby-yoda-1.webp' },
      { collection_id: 2, collection_license: 'POKEMON', collection_name: 'POKEMON INDIGO', collection_description: 'Atrapa todos los que puedas y disfruta de una colección llena de amigos.', collection_image: '/multimedia/pokemon/vulpix-1.webp' },
      { collection_id: 3, collection_license: 'HARRY POTTER', collection_name: 'HARRY POTTER', collection_description: 'Revive los recuerdos de una saga llena de magia y encanto.', collection_image: '/multimedia/harry-potter/snape-patronus-1.webp' }
    ]);

    await Products.bulkCreate([
        
            {  product_name: 'BABY YODA BLUEBALL', product_description: 'Figura coleccionable Star Wars', product_price: 1799.99, product_stock: 10, product_sku: 'STW001001', dues: 10, img_front: '/multimedia/star-wars/baby-yoda-1.webp', img_back: '/multimedia/star-wars/baby-yoda-box.webp', new_in: 1, categoryId: 1, collectionId: 1 },
            {  product_name: 'BOBA FETT FIGHTER', product_description: 'Figura coleccionable Star Wars', product_price: 1799.99, product_stock: 10, product_sku: 'STW001002', dues: 10, img_front: '/multimedia/star-wars/bobbafeth-1.webp', img_back: '/multimedia/star-wars/bobbafeth-box.webp', new_in: 0, categoryId: 1, collectionId: 1 },
            {  product_name: 'LUKE AND GROGU', product_description: 'Figura coleccionable Star Wars', product_price: 1799.99, product_stock: 10, product_sku: 'STW001003', dues: 10, img_front: '/multimedia/star-wars/luke-1.webp', img_back: '/multimedia/star-wars/luke-box.webp', new_in: 0, categoryId: 1, collectionId: 1 },
            {  product_name: 'STORMTROPPER', product_description: 'Figura coleccionable Star Wars', product_price: 1799.99, product_stock: 10, product_sku: 'STW001004', dues: 10, img_front: '/multimedia/star-wars/trooper-1.webp', img_back: '/multimedia/star-wars/trooper-box.webp', new_in: 0, categoryId: 1, collectionId: 1 },
          
            {  product_name: 'CHARMANDER', product_description: 'Figura coleccionable pokemon', product_price: 1799.99, product_stock: 10, product_sku: 'PKM001001', dues: 10, img_front: '/multimedia/pokemon/charmander-1.webp', img_back: '/multimedia/pokemon/charmander-box.webp', new_in: 0, categoryId: 2, collectionId: 2 },
            {  product_name: 'DRAGONITE', product_description: 'Figura coleccionable pokemon', product_price: 1799.99, product_stock: 10, product_sku: 'PKM001002', dues: 10, img_front: '/multimedia/pokemon/dragonite-1.webp', img_back: '/multimedia/pokemon/dragonite-box.webp', new_in: 1, categoryId: 2, collectionId: 2 },
            {  product_name: 'PIDGEOTTO', product_description: 'Figura coleccionable pokemon', product_price: 1799.99, product_stock: 10, product_sku: 'PKM001003', dues: 10, img_front: '/multimedia/pokemon/pidgeotto-1.webp', img_back: '/multimedia/pokemon/pidgeotto-box.webp', new_in: 1, categoryId: 2, collectionId: 2 },
            {  product_name: 'PIKACHU', product_description: 'Figura coleccionable pokemon', product_price: 1799.99, product_stock: 10, product_sku: 'PKM001004', dues: 10, img_front: '/multimedia/pokemon/pikachu-1.webp', img_back: '/multimedia/pokemon/pikachu-box.webp', new_in: 0, categoryId: 2, collectionId: 2 },
            {  product_name: 'VULPIX', product_description: 'Figura coleccionable pokemon', product_price: 1799.99, product_stock: 10, product_sku: 'PKM001005', dues: 10, img_front: '/multimedia/pokemon/vulpix-1.webp', img_back: '/multimedia/pokemon/vulpix-box.webp', new_in: 0, categoryId: 2, collectionId: 2 },
          
            {  product_name: 'HARRY', product_description: 'Figura coleccionable Harry Potter', product_price: 1799.99, product_stock: 10, product_sku: 'HPT001001', dues: 10, img_front: '/multimedia/harry-potter/harry-1.webp', img_back: '/multimedia/harry-potter/harry-box.webp', new_in: 0, categoryId: 3, collectionId: 3 },
            {  product_name: 'HERMIONE', product_description: 'Figura coleccionable Harry Potter', product_price: 1799.99, product_stock: 10, product_sku: 'HPT001002', dues: 10, img_front: '/multimedia/harry-potter/hermione-1.webp', img_back: '/multimedia/harry-potter/hermione-box.webp', new_in: 0, categoryId: 3, collectionId: 3 },
            {  product_name: 'LUNA', product_description: 'Figura coleccionable Harry Potter', product_price: 1799.99, product_stock: 10, product_sku: 'HPT001003', dues: 10, img_front: '/multimedia/harry-potter/luna-1.webp', img_back: '/multimedia/harry-potter/luna-box.webp', new_in: 1, categoryId: 3, collectionId: 3 },
            {  product_name: 'SNAPE PATRONUS', product_description: 'Figura coleccionable Harry Potter', product_price: 1799.99, product_stock: 10, product_sku: 'HPT001004', dues: 10, img_front: '/multimedia/harry-potter/snape-patronus-1.webp', img_back: '/multimedia/harry-potter/snape-patronus-box.webp', new_in: 1, categoryId: 3, collectionId: 3 },
          ]);

    console.log('Datos iniciales insertados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar e insertar datos:', error);
  } finally {
    await sequelize.close();
  }
};


