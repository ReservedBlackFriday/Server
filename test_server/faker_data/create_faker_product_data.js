const { faker } = require("@faker-js/faker");
const Product = require("../src/models/Product");
const BFProduct = require("../src/models/BFProduct");

for (let i = 0; i < 100; i++) {
  const faker_product = {
    name: faker.commerce.product(), // 'Mouse'
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(), // '438.00'
    // discount_rate: 0,
    // amount: 100,
  };
  const product = new Product(faker_product);
  product.save();

  if (i % 2 == 0) {
    const randomAmount =
      Math.floor(Math.random() * (Math.floor(60) - Math.ceil(20))) +
      Math.ceil(20);

    const bfProduct = new BFProduct({
      productId: product._id,
      amount_group: {
        A: randomAmount * 5,
        B: randomAmount * 5,
        C: randomAmount * 5,
        D: randomAmount * 5,
        E: randomAmount * 5,
      },
    });
    bfProduct.save();
    console.log(bfProduct);
  }
}
