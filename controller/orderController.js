const ORDER_DATA =require('../models');
const orderDatas = ORDER_DATA.orders
// const stripe = require('stripe')(process.env.SECRET_KEY)
// console.log(process.env.SECRET_KEY);




const createOrder = async(req,res)=>{
    try{
        console.log(orderDatas);
        const listOrders = {
            customerID: req.body.customerID,
            stripeID: req.body.stripeID
        }
        const ordersData = await orderDatas.create(listOrders)
        return res.status(200).send({ status: 200, message: "order created successfully", data: ordersData })
    }catch(err){
        return res.status(400).json({ status: 400, message: err.message || err }); 
    }
  
    }

const product =async (req,res)=> {
  const stored =  await stripe.products.create({
    name: req.body.name,
    price:req.body.price,
    description:req.body.description
})
console.log(stored,'stored');
    return res.status(200).send({ status: 200, message: " stored successfully", data: stored })
}



    const findDatas =async (req,res)=>{
        try{

const searchData = await orderDatas.findAll({})
            return res.status(200).send({ status: 200, message: "details listed successfully", data: searchData })

        }catch(err){
            return res.status(400).json({ status: 400, message: err.message || err });
        }
    }

module.exports = { createOrder, findDatas, product }


