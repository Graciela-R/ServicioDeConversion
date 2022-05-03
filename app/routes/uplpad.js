const express=require('express')
const controller =require('../controller/upload')
const convert= require('../controller/convert')
const  { GetImagen, CreateImagen } = require('../../config/db')
const router = express.Router()
const path=require('path');

//ruta principal de portada
router.get('/portada',(req, res)=>{
    res.sendFile(path.join(__dirname,'../../index.html'))
    
});
console.log(path.join(__dirname,'../../imagenPortada.html'))
router.post(
    `/`,
    controller.upload   
)
router.get('/getimagen', GetImagen);
module.exports =router   

