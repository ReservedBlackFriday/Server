const BFProduct = require("../models/BFProduct");
const Product = require("../models/Product");
const getTodayGroupId = require("../config/getTodayGroupId");

// 블랙 프라이데이 제품 리스트 get 컨트롤러
exports.getBFProductList = async (req, res) => {
  const todayGroupId = await getTodayGroupId();

  try {
    const productList = await BFProduct.find()
      .populate("productId", "name price") // populate를 통해 원하는 필드만 선택합니다.
      .select(`amount.${todayGroupId} productId`);
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
exports.getBFProduct = async (req, res) => {
  const todayGroupId = await getTodayGroupId();
  const productId = req.query.productId;

  try {
    const product = await BFProduct.findOne({ _id: productId })
      .populate("productId", "name price description") // populate를 통해 원하는 필드만 선택합니다.
      .select(`amount.${todayGroupId} productId`);

    res.status(200).json({
      message: "Black Friday Product Details",
      product: product,
    });
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    res.status(500).json({ error: err });
  }
};
