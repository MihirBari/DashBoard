const express = require("express");
const { showDealer,showCustomer,addDealer,addCustomer, deleteCustomer, deleteSeller } = require("../controller/dealer");

const router = express.Router();

router.get("/showDealer", showDealer);
router.get("/showCustomer", showCustomer);
router.post("/addDealer", addDealer);
router.post("/addCustomer", addCustomer);
router.delete("/del", deleteCustomer);
router.delete("/delete", deleteSeller);

module.exports = router;