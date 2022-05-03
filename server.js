const express = require('express')
const bodyParser= require('body-parser')  
require('dotenv').config({path:'./.env'});

const app= express()

//Configuracion de servidor
const port=process.env.PORT;
//subida de archivo
const uploadRoutes = require('./app/routes/uplpad')
app.use(uploadRoutes)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
/*app.use(
    bodyParser.json({
       limit: '20mb'
    })
 )
 //para parsear con el encabezado from url urlecode
 app.use(
    bodyParser.urlencoded({
       limit:'20mb',
       extended:true
    })
 )*/


app.listen(port,()=>{
    console.log('la aplicacion esta en linea');
})



