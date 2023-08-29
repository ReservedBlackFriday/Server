const BFProduct = require("../models/BFProduct");
const Product = require("../models/Product");

// 블랙 프라이데이 제품 리스트 get 컨트롤러
exports.getBFProductList = async (req, res) => {
  try {
    const productList = await BFProduct.find()
      .populate("productId", "name price") // populate를 통해 원하는 필드만 선택합니다.
      .select("amount productId");
    res.status(200).json({
      message: "Black Friday Product List",
      product_list: productList,
    });
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    res.status(500).json({ error: err });
  }
};

// 블랙 프라이데이 제품 get (id로 조회) 컨트롤러
exports.getBFProduct = async (req, res) => {};
