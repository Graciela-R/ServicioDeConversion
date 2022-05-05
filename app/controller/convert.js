const path = require('path');   
const fs = require("fs");
const pdf = require('pdf-poppler')
const{guardarImagen, guardarImagenes}= require('../../config/db')


//node-poppler2
const dir=`${__dirname}/../../pdfImageFolder`
const absolutepath=path.join(path.resolve(dir))

function convertImage(pdfPath) {
    const NombreDB = path.basename(pdfPath, path.extname(pdfPath));
    const carpetaGuardado= fs.mkdirSync(path.join(absolutepath, NombreDB));
    let option = {
        format : 'jpeg',
        out_dir: path.join(absolutepath, NombreDB),
        out_prefix : path.basename(pdfPath, path.extname(pdfPath)),//guarde en carpetas
        //almacenar absolutepath y outprefix en la base de datos
        //page : 1
    }
// option.out_dir valor donde el archivo estara guardado
//pdfpath es la ruta del archivo que se va cambiar
    //console.log(option.out_prefix)
    pdf.convert(pdfPath, option)
    .then(async(e) => {
        console.log('file converted??????', e)
          //await guardarDocumento_img(NombreDB,option.out_dir);
        //aqui porque esta llamando mas antes-------


        fs.readdir(option.out_dir, (e, f)=>{
            console.log('ARCHIVOSSSSS',f)
            f.map(async(x)=>{
                await guardarImagen( x, option.out_dir)
            })
        })
    })
    .catch(err => {
        console.log('an error has occurred in the pdf converter ' + err)
    })
}

module.exports.convertImage=convertImage;