const express = require('express')

const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const userRoutes = require("./routes/userRoutes")

const authRoutes = require('./routes/authRoutes')

const app=express()

app.use(express.json())

app.use("/api/products",productRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/users",userRoutes)
app.use("api/auth", authRoutes)

module.exports = app;