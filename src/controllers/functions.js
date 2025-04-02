import axios from "axios";
import fs from 'fs';
import FormData from 'form-data';

export function guardarArchivo (archivo, origen) {
    try{
        const carpeta = getFechaActual();
        const ruta = 'C:\\www\\xml_files\\';
        const rutaArchivo = ruta + carpeta + '\\' + getHoraActual().replace(new RegExp(':', 'g'),'') + '_' + origen +'.xml';
        const rutaCarpeta = ruta + carpeta;
    
        if(!fs.existsSync(rutaCarpeta)){
          fs.mkdirSync(rutaCarpeta);
        }
    
        fs.writeFileSync(rutaArchivo, archivo.toString(), { flag: 'a' });
    
    
      }catch(err){
        console.error(err.message);
      }
}

export function getFechaActual(){
    const fechaActual = new Date();
  
    // Obtiene los componentes de la fecha (año, mes, día)
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
  
    // Crea el texto de fecha en formato 'yyyy-mm-dd'
    const fechaFormatoTexto = `${anio}-${mes}-${dia}`;
  
    return fechaFormatoTexto;
  }

export function getHoraActual(){
    const now = new Date();
  
    // Obtener las horas, minutos y segundos en formato de 24 horas
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    // Crear el string en formato "hh:mm:ss"
    const currentTimeString = `${hours}:${minutes}:${seconds}`;
  
    return currentTimeString;
  }
  
export function escribir(textoAAlmacenar){
    const rutaArchivo = 'C:\\www\\pos_err_log\\'+ getFechaActual() +'.log';
  
    let textoFinal = '*********\n'.concat(textoAAlmacenar);
  
    try {
      // Añadir contenido al archivo en modo de apendizaje de forma sincrónica
      fs.writeFileSync(rutaArchivo, textoFinal, { flag: 'a' });
      console.log('Contenido agregado al archivo exitosamente (modo sincrónico).');
    } catch (err) {
      console.error('Error al escribir en el archivo:', err);
    }
  };

export function enviarErrorCorreo(error, fechaUltimoEnvioError){
    try{
      const url = "http://200.75.30.221:4041/email";
      let fechaActual = new Date();
    
      let enviarCorreo = false;
    
      if (fechaUltimoEnvioError == null){
          enviarCorreo = true;
          fechaUltimoEnvioError = new Date();
      }else{
        const diferenciaMili = fechaActual - fechaUltimoEnvioError;
    
        const diferenciaEnHoras = diferenciaMili / (1000 * 60 * 60);
    
        console.log('tiempo ultimo correo: ', diferenciaEnHoras);
  
        if(diferenciaEnHoras >= 3.0 ){
          enviarCorreo = true;
          fechaUltimoEnvioError = new Date();
        }
      }
    
      if(enviarCorreo){
        const form = new FormData();
        form.append('from', 'API Sonda');
        form.append('to', 'pbn@rbu.cl, fir@rbu.cl, rme@rbu.cl, njm@rbu.cl, igs@rbu.cl');
        form.append('subject', 'Error API Sonda');
        form.append('html', error);
      
        const config = {
          headers: {
            ...form.getHeaders()
          }
        };
      
        axios.post(url, form, config)
        .then(response => {
            console.log('Envío de error OK:', response.data);
          })
        .catch(err => {
            console.error('Error envío correo: ', err);
        });
      }
    }catch(err){
      escribir( getHoraActual() + '\n');
      escribir(err.toString()+'\n') ;
    }

    return fechaUltimoEnvioError;
  }