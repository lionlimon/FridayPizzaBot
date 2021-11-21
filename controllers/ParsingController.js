import osmosis from 'osmosis';
import { PIZZA_SITE, PIZZA_URL } from '../config';
import { Product } from '../models/Product';

const TRIES = 10;
const PRODUCT_SELECTOR = '.op-item';
const TITLE_SELECTOR = '.product-unit__title';
const PRICE_SELECTOR = '.js-product-unit__price';
const IMG_SELECTOR = '.product-unit__img-src@src';

osmosis.config('tries', TRIES);

async function parseProducts() {
  const products = [];

  await osmosis.get(PIZZA_URL)
    .find(PRODUCT_SELECTOR)
    .set({
      name: TITLE_SELECTOR,
      price: PRICE_SELECTOR,
      img: IMG_SELECTOR
    })
    .data(data => products.push({ ...data, img: `${PIZZA_SITE}/${data.img}` }))
    .log(console.log)
    .error(console.error);

  if (products.length > 0) {
    await Product.bulkCreate(products);
  }
}

export default {
  parseProducts
};
