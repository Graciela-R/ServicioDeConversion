const multer = require('multer');
const path = require('path');
const convert= require('./convert')
const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require('uuid')
const {guardarpdf}= require('../../config/db')

let variableruta;
let nombre;
let nombreTipo;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads')
        //esto es en la carpeta donde se esta guardando
    },
    filename: function(req, file, cb){
        console.log(file)
        variableruta=`${Date.now()}-`+ uuidv4()+path.extname(`${file.originalname}`);
        cb(null,variableruta);
        const dir=`${__dirname}/../../uploads`
        const dirresolve=path.join(path.resolve(dir));
        const absolutepath=path.join(path.resolve(dir),variableruta)//manda la ruta mas el nombre
        //mandando a la base de datos para almacenar
        guardarpdf(variableruta,absolutepath);
        convert.convertImage(absolutepath)
        console.log(absolutepath);
        //esto es el nombre con lo que se esta guardando
    }

})

const upload=multer({storage: storage})
exports.upload=upload.single('myFile')

