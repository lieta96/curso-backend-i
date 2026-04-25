import "dotenv/config";
import express from "express";
import mongoose from 'mongoose'
import productsRouter from './router/products.routes.js'
import  {  engine  }  from  'express-handlebars' ;
import viewsRouter from "./router/views.router.js"
import {__dirname} from "./utils.js"

const app = express()

app.set ( 'view engine' , 'handlebars' )
app.engine ( 'handlebars' , engine ( ) )
app.set ( 'views' , __dirname + "/views" )
app.use("/",viewsRouter)
app.use("/api/products",productsRouter)
app.listen(3000,()=>{
    console.log("Servidor levantado en puerto 3000")
    mongoose.connect(process.env.DB_URI).then(()=>console.log("Conectado a DB"))
})
