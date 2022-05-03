const { Pool} = require('pg');
require('dotenv').config({path:'../.env'});

    const clientPool = new Pool({
       user: process.env.USER,
       host: process.env.HOST,
       database: process.env.DATABASE,
       password: process.env.PASSWORD,
       port: process.env.PORT_DB,
     })
  
//GetUsers
const GetImagen=async(req, res)=>{
    const respuesta= await clientPool.query('select * from imagen');
    //console.log(respuesta.rows);
    res.status(200).json(respuesta.rows)
}
//guardado de pdf
let idPdf=0;
//aqui se guarda el documento
const guardarpdf= async(titulo, ruta_doc)=>{
    try{
       const respuesta= clientPool.query('insert into documento(titulo, ruta_doc) values ($1, $2)', [titulo, ruta_doc]);
        console.log("Se inserto correctamente a Documento");
        //console.log("entro a pdf");
    }

    catch(err){
        console.log('Error',err)
    }
};
const idDocumentoPdf=0;
//Aqui se guarda la imagen
const guardarImagen= async(titulo, ruta)=>{
    try{
        const sacar= await clientPool.query('select max(id) from documento');
        const sacar3=sacar.rows.forEach( async Element=>{
            console.log("este es del documento_img"+Element.max);
            const respuesta= await clientPool.query('insert into imagen(titulo, ruta,id_documento) values ($1, $2, $3)', [titulo, ruta,Element.max]);
                console.log("Se inserto correctamente a Imagen!!!");
            
            
        })
       /* const sacar2=sacar.then( x=>{
            x.rows.forEach(Element=>{
                idPdf=Element;
                console.log(Element);
                const respuesta= clientPool.query('insert into documento_img(titulo, ruta_img,id_pdf) values ($1, $2, $3)', [titulo, ruta_img,idPdf.max]);
                console.log("Se inserto correctamente a Documento_img!!!");
            });
        },err=>{
            console.log("error");
        })*/
    }
    catch(err){
        console.log('Error>',err)
    }
};
//funcion para guardar imagenes-------------
/*const guardarImagenes =async (rutas, path)=> {
   
   try{
     
     const sacar=await clientPool.query('select max(id) from documento_img');
     console.log("mmmmmmmmmmmmm"+sacar);
     console.log(sacar.rows)
      const sacar3=sacar.rows.forEach(Element=>{
          console.log(Element.max);
      })
    /* const sacar2= sacar.then(x=>{
         x.rows.forEach(Element=>{
             idPdf=Element;
             console.log(Element);
             const respuesta= clientPool.query('insert into imagen(titulo, ruta, id_documentoimg) values($1, $2, $3)',[rutas, path,idPdf.max]);
             console.log("Se inserto correctamente en imagen");
         });
     },err=>{
         console.log("error");
     })

   }catch(err){
       console.log("error",err)

   }
} */
module.exports={
    GetImagen,
    guardarImagen,
    guardarpdf
}