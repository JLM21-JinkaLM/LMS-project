const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken =(userId)=>{
    return jwt.sign(
        {id:userId},
        process.env.JWT_SECRET
    )
}

exports.register=async(req,res)=>{
    const user = await User.create(req.body)
    const token = generateToken(user._id);

    res.status(201).json({token,user})
}

exports.login = async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("password");

    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({message:"Invalid Credentials"})
    }

    const token = generateToken(user._id);
    res.status(201).json({token,user:{
        userId: user._id,
        email: user.email,
        role:user.role
    }})

}