const express = require("express");
const { order, updateOrder, viewOrder,deleteOrder } = require("../controller/order");

const router = express.Router();

router.get(`/viewOrder`, viewOrder);
router.post("/order", order);
router.put(`/updateOrder/:product_id`, updateOrder);
router.delete("/delete", deleteOrder);


module.exports = router;