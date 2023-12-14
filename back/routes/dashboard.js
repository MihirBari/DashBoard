const express = require("express");
const { TotalProducts,TotalProductsSold,TotalProductsLeft,TotalAmountCollected , TotalReturned  } = require("../controller/dashboard");

const router = express.Router();

router.get("/TotalProducts", TotalProducts);
router.get("/TotalProductsSold", TotalProductsSold);
router.get("/TotalProductsLeft", TotalProductsLeft);
router.get("/TotalAmountCollected", TotalAmountCollected);
router.get("/TotalReturned", TotalReturned);

module.exports = router;