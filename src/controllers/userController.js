const User = require('../models/User');
const {trusted} = require("mongoose")
const req = require('express/lib/request')

exports.createUser =async(req,res)=>{
   try{
      
    const exists = await User.exists()
    let nextId = 0;

    if(!exists){
        nextId =1
    }
    else{
         const lastUser = await User.find()
        .sort({_id:-1}).limit(1).select("_id");

        nextId = lastUser[0]._id ? lastUser[0]._id + 1 : 1;
    }

    const user = await User.create({
        _id:nextId,
       ...req.body
    })

    res.status(201).json(user)
   }
   catch(error){
    res.status(400).json({
        message:error.message
    })
   }
}


exports.getAllUsers=async(req,res)=>{
    try{
        const exists = await User.exists()

        if(!exists){
           console.log("collection is empty")
            res.status(400).json({
            message:"collection is empty"
          })
        }
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(400).json({
        message:error.message
    })
    }
}

exports.getActiveUsers=async(req,res)=>{
    try{
        const exists = await User.exists()

        if(!exists){
           console.log("collection is empty")
            res.status(400).json({
            message:"collection is empty"
          })
        }
        const users = await User.find({isActive:true});
        res.status(200).json(users);
    }
    catch(error){
        res.status(400).json({
        message:error.message
    })
    }
}


exports.getUserByEmail=async(req,res)=>{
    try{
        const {email} = req.params;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
            message:"User Not Found"
          })
        }

        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({
        message:error.message
    })
    }
}