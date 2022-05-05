const path = require('path');   
const fs = require("fs");
const { Poppler } = require("node-poppler");
const{guardarImagen, guardarImagenes}= require('../../config/db')


//empezando con node poppler2
const poppler = new Poppler();

const dir=`${__dirname}/../../pdfImageFolder`
const absolutepath=path.join(path.resolve(dir))

function convertImage(pdfPath){  
    const file = pdfPath;
    const NombreDB = path.basename(pdfPath, path.extname(pdfPath));//nombre de la carpeta que se esta guardando
     fs.mkdirSync(path.join(absolutepath, NombreDB));
    console.log("ESTE ES EL NOMBRE DE BASE DE DATOS"+ NombreDB);
    const rutaGuradado=path.join(absolutepath,NombreDB);//ruta donde va estar guardado
    const options = {    
        pngFile: true,
    };

    const outputFile =path.join(rutaGuradado,path.basename(pdfPath));//El nombre con el que va salir
    console.log("---AQUI LOS ARCHIVOS "+outputFile);

    poppler.pdfToCairo(file, outputFile, options)
    
    .then(async(res)=>{
        console.log(res);
        fs.readdir(path.join(absolutepath, NombreDB), (e, f)=>{
            console.log('ARCHIVOSSSSS',f)
            f.map(async(x)=>{
                await guardarImagen( x, path.join(absolutepath, NombreDB))
            })
        })
    });

}


module.exports.convertImage=convertImage;







