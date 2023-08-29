const BFProduct = require("../models/BFProduct");
const Product = require("../models/Product");
const User = require("../models/User");

const getTodayGroupId = require("../config/getTodayGroupId");

// 블랙 프라이데이 제품 리스트 get 컨트롤러
exports.getBFProductList = async (req, res) => {
  const todayGroupId = await getTodayGroupId();

  try {
    const productList = await BFProduct.find()
      .populate("productId", "name price") // populate를 통해 원하는 필드만 선택합니다.
      .select(`amount.${todayGroupId} productId`);
    return res.status(200).json({
      message: "Black Friday Product List",
      product_list: productList,
    });
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    return res.status(500).json({ message: err.message });
  }
};

// 블랙 프라이데이 제품 get (id로 조회) 컨트롤러
exports.getBFProduct = async (req, res) => {
  const todayGroupId = await getTodayGroupId();
  const productId = req.query.productId;

  if (productId == undefined) {
    throw new Error("Not Exists ProductId");
  }

  try {
    const product = await BFProduct.findOne({ _id: productId })
      .populate("productId", "name price description") // populate를 통해 원하는 필드만 선택합니다.
      .select(
        `discount_rate discount_price amount_group.${todayGroupId} productId`
      );

    product["amount"] = product.amount_group[String(todayGroupId)];
    console.log(product);
    //delete product[todayAmount];

    res.status(200).json({
      message: "Black Friday Product Details",
      product: product,
    });
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    res.status(500).json({ message: err.message });
  }
};

// 해당 날짜 재고의 재품 구매
exports.purchaseProduct = async (req, res) => {
  const todayGroupId = await getTodayGroupId();
  const { email, productId } = req.body;

  if (email == undefined || productId == undefined) {
    throw new Error("Not Exists Email or ProductId");
  }

  try {
    // 유저가 없으면 에러
    const user = await User.findOne({ email });
    const bfProduct = await BFProduct.findOne({ _id: productId });
    if (!user || !bfProduct) {
      return res.status(404).json({
        message: "No user or product found with this email and productId",
      });
    }

    // 제품의 재고가 없을 때
    if (bfProduct["amount_group"][String(todayGroupId)] == 0) {
      return res
        .status(403)
        .json({ message: "The product does not exist in stock" });
    }

    // 이미 제품을 구매했는지 검사
    for (const purchase of user.purchase_history) {
      if (String(purchase.productId) === String(productId)) {
        return res
          .status(403)
          .json({ message: "The user has already completed the purchase" });
      }
    }

    // 재고량 -1, 같은 데이터 한번에 접근을 할 수 있으므로 await 키워드로 동시성 제어
    bfProduct["amount_group"][String(todayGroupId)] -= 1;
    await bfProduct.save();

    // user 데이터에 구매이력 추가
    user["purchase_history"].push({ productId });
    user.save();

    return res.status(201).json({ message: "Successful purchase of product" });
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    return res.status(500).json({ message: err.message });
  }
};

// 재고 소진 시 다른 날의 제품 추첨 응모 기능 컨트롤러
exports.applyProductLottery = async (req, res) => {
  const todayGroupId = await getTodayGroupId();
  const { email, productId } = req.body;

  if (email == undefined || productId == undefined) {
    throw new Error("Not Exists Email or ProductId");
  }

  try {
    const user = await User.findOne({ email });
    const bfProduct = await BFProduct.findOne({ _id: productId });
    // 유저가 없으면 에러
    if (!user || !bfProduct) {
      return res.status(404).json({
        message: "No user or product found with this email and productId",
      });
    }

    // 선택한 제품이 재고가 0인지 검사
    if (bfProduct["amount_group"][String(todayGroupId)] != 0) {
      return res.status(403).json({ message: "The product does is in stock" });
    }
    // 선택한 제품의 해당 유저가 이미 추첨 응모를 했는지 검사
    for (const user of bfProduct["lottery_users"]) {
      if (String(user.userId) === String(user._id)) {
        return res
          .status(403)
          .json({ message: "The user has already been drawn" });
      }
    }

    // 블랙 프라이데이 제품 데이터에 추첨 신청자 push
    const userId = user._id;
    bfProduct["lottery_users"].push({ userId });
    await bfProduct.save();

    return res.status(201).json({
      message: "Successfully entered the lottery",
      lottery_users_count: bfProduct["lottery_users"].length,
    });
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    return res.status(500).json({ message: err.message });
  }
};
