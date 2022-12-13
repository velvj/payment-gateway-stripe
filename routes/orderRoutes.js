const ORDER_DATA=require('../controller/orderController')
const express =require('express')
const router = express.Router();


router.post('/createuser',ORDER_DATA.createOrder)
router.post('/products', ORDER_DATA.product)
router.get('/findDatas', ORDER_DATA.findDatas)
// router.post('/stripeCreator', ORDER_DATA.stripeCreator)


module.exports=router