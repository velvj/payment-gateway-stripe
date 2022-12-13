const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const db=require('./models')
const orderRoutes = require('./routes/orderRoutes')
const path = require('path')
const uuid=require('uuid').v4

const ORDER_DATA = require('./models');
const orderDatas = ORDER_DATA.orders



app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 7000


// var secret_key = "sk_test_51LvdrJGZy0c75e4AGDtaejpxPLxDGrWiKb3SlmQaSG7qmjAduWY2NVgjdtNhJDVBSbcwDiNYlxWyqEAl2pG3jsV0004iiOiwA1"
// var public_key = 'pk_test_51LvdrJGZy0c75e4A4Zjm4HiTItZspNNWLiWKGnos6Bpv7hrjvBWHZV2Zhz73AjbRTJYHiTF2RBUAhvd8kfb3HivY00MJjkxjaX'
app.use('/order', orderRoutes);
const stripe = require('stripe')(process.env.SECRET_KEY)
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('Home', {
        key: process.env.PUBLIC_KEY
    })
})
// app.post('/payment', async function(req, res){
//     // Moreover you can take more details from user
//     // like Address, Name, etc from form
// try { 
//     const customer =await  stripe.customers.create({
//         email: req.body.stripeEmail,
//         source: req.body.stripeToken,
//         name: 'sasi kumar',
//         address: {
//             line1: '123 IT street',
//             postal_code: '123456',
//             city: 'paris',
//             state: 'california ',
//             country: 'USA',
//         }
//     })
//         const charge = await stripe.charges.create({
//             amount: 25000,     // Charging Rs 25
//             description: 'Web Development Product',
//             currency: 'USD',
//             customer: customer.id
//         });
//     console.log( "charge",charge.id);

//     return res.status(200).send({ status: 200, message: "Charges created successfully", data: { charge } }) 

// } catch (err) {
//     return res.status(400).json({ status: 400, message: err.message || err });
// }
// });



app.post('/payment', async function (req, res) {
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    try {

        const token = await stripe.tokens.create({
            card: {
                number: '4242424242424242',
                exp_month: 10,
                exp_year: 2023,
                cvc: '314',
            },
        });
        console.log("token",token);
        const product = await stripe.products.create({
            name: 'Gold Special',
        });


        const customer = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: req.body.name,
            address: {
                line1: req.body.line1,
                postal_code: req.body.postal_code,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
            }
        })
        const customers = await stripe.customers.list({
            limit: 3,
        });
        // console.log("stripeToken", await customer.source)
        console.log("stripeToken", customers)
        // console.log("stripeEmail", await customer.email)

        // console.log("customer", customer);
        const charge = await stripe.charges.create({
            amount: 25000,     // Charging Rs 25
            description: 'Web Development Product',
            currency: 'USD',
            customer: customer.id
        });
        console.log("chargesid",charge);
        const chagers = await stripe.charges.list({
            limit: 3,
        });
        console.log("chagers", chagers);
        const listOrders = {
            customerID: customer.id,
            stripeID: charge.id
        }
        let ordersData = await orderDatas.create(listOrders)
        // console.log("ordersData", ordersData);
        return res.status(200).send({ status: 200, message: "Charges created successfully", data:  ordersData  })

    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message || err });
    }
});


// app.post('/saveid', async (req, res) => {
//     try {
//         console.log(orderDatas);
//         const listOrders = {
//             customerID: req.body.customer,
//             stripeID: req.body.stripeID
//         }
//         const ordersData = await orderDatas.create(listOrders)
//         return res.status(200).send({ status: 200, message: "order created successfully", data: ordersData })
//     } catch (err) {
//         return res.status(400).json({ status: 400, message: err.message || err });
//     }

// })




// db.sequelize.sync({}).then(()=>{
//     console.log("DataBase sync");
// })


app.listen(PORT, () => { console.log(`server listening on ${PORT}`) })