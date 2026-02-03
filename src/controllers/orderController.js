const Order = require('../models/Order');
const Product = require("../models/Product")

exports.createOrder =async(req,res)=>{
   try{
      const {productId,quantity,customerId} = req.body;
    const count = await Order.countDocuments()
    let nextId = 1;

    if(count!=0){
        const lastOrder = await Order.find()
        .sort({_id:-1}).limit(1).select("_id");

        nextId = lastOrder[0]._id ? lastOrder[0]._id+1 : 1;
    }

    const product = await Product.findById(productId)

    if(!product || !product.isAvailable){
        return res.status(400).json({
            message:"product Not Found"
        })
    }

    if(!product.quantity<quantity){
        return res.status(400).json({
            message:"Insufficient Stock"
        })
    }

    const total = product.price*quantity;

    const order = await Order.create({
        _id:nextId,
        productId:product._id,
        quantity,
        price:product.price,
        totalAmount:total,
        customerId,
        orderDate:new Date()
    })

    product.quantity -= quantity

    await product.save();

    res.status(201).json(order)
   }
   catch(error){
    res.status(500).json({
        message:error.message
    })
   }
}


exports.getAllOrders=async(req,res)=>{
    const orders = await Order.find();
    res.status(200).json(orders);
}