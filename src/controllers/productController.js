const Product = require('../models/Product');


exports.createProduct =async(req,res)=>{
   try{
      
    const exists = await Product.exists()
    let nextId = 0;

    if(!exists){
        console.log('collection is empty')
        nextId =1
    }
    else{
         const lastProduct = await Product.find()
        .sort({_id:-1}).limit(1).select("_id");

        nextId = lastProduct[0]._id ? lastProduct[0]._id + 1 : 1;
    }

    const product = await Product.create({
        _id:nextId,
       ...req.body
    })

    res.status(201).json(product)
   }
   catch(error){
    res.status(400).json({
        message:error.message
    })
   }
}

exports.getProducts=async(req,res)=>{
    const products = await Product.find();
    res.json(products);
}

exports.updateProduct=async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });
    res.json(product);
}

exports.deleteProduct=async(req,res)=>{
    const products = await Product.findByIdAndDelete(req.params.id);
    res.json({message:"product deleted"});
}
exports.getProduct=async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.json(product);
}

