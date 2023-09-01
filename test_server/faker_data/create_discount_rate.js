const BFProduct = require("../src/models/BFProduct");
const Product = require("../src/models/Product");

BFProduct.find()
  .populate("productId")
  .then((bfProductList) => {
    for (bfProduct of bfProductList) {
      const randomDiscount =
        Math.floor(Math.random() * (Math.floor(90) - Math.ceil(30) + 1)) +
        Math.ceil(30);
      bfProduct["discount_rate"] = randomDiscount;
      bfProduct["discount_price"] =
        bfProduct["productId"]["price"] * (1 - randomDiscount / 100);
      console.log(bfProduct);
      bfProduct.save();
    }
  });
