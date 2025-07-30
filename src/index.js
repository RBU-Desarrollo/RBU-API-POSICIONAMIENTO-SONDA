import express, { text } from "express";
import cors from "cors";
import app from "./app.js";
import { PORT } from "./config/env.js";
import {
  BASIC_AUTH_11,
  BASIC_AUTH_13,
  XML_AUTH_11,
  XML_AUTH_13,
} from "./config/api.js";
import { getConnection, getConnectionTesting } from "./config/db.js";
import sql from "mssql";
import axios from "axios";
import tls, { CLIENT_RENEG_LIMIT } from "tls";
import xml2js from "xml2js";
//import moment from "moment";
//import cron from "node-cron";
import fs from "fs";
import FormData from "form-data";

import {
  guardarArchivo,
  getFechaActual,
  getHoraActual,
  escribir,
  enviarErrorCorreo,
  escribirTesting,
} from "./controllers/functions.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// OBTENER POSICIONAMIENTO
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

tls.DEFAULT_MIN_VERSION = "TLSv1.2";
tls.DEFAULT_MAX_VERSION = "TLSv1.2";
let fechaUltimoEnvioError = null;

/*axios.defaults.baseURL =
  "https://200.71.222.43:8643/posicionamientoenlineaws/services";*/

axios.defaults.baseURL = "https://200.71.222.43:8643/posenlineaRBUws/services";
axios.defaults.headers.common["Content-Type"] = "text/xml;charset=utf-8";
axios.defaults.headers.common["SOAPAction"] = '""';

let ejecutando = false;

const obtenerPosicionamiento = async () => {
  try {
    //El item 0 realiza un delete de la tabla sonda_pos_flota
    const pool = await getConnection();
    await pool
      .request()
      .input("item", sql.TinyInt, 0)
      .execute("sonda_procDelPosicionamientoApi");

    const { data: data11 } = await axios.post(
      "/GetPosenLineaRBUSOAP",
      XML_AUTH_11,
      {
        auth: BASIC_AUTH_11,
      }
    );
    const { data: data13 } = await axios.post(
      "/GetPosenLineaRBUSOAP",
      XML_AUTH_13,
      {
        auth: BASIC_AUTH_13,
      }
    );

    const parser = new xml2js.Parser();
    let items11 = [];
    let items13 = [];
    let itemsFull = [];
    const firstWord = "<ns1:rows>";
    const secondWord = "</ns1:rows>";

    const startIndex11 = data11.indexOf(firstWord) + firstWord.length;
    const endIndex11 = data11.indexOf(secondWord, startIndex11);
    const result11 = `<ns1:rows>${data11.substring(
      startIndex11,
      endIndex11
    )}</ns1:rows>`;

    const startIndex13 = data13.indexOf(firstWord) + firstWord.length;
    const endIndex13 = data13.indexOf(secondWord, startIndex13);
    const result13 = `<ns1:rows>${data13.substring(
      startIndex13,
      endIndex13
    )}</ns1:rows>`;

    if (data11.includes("<ns1:item>")) {
      parser.parseString(result11, (err, result) => {
        if (err)
          return console.error({ error: `Error al convertir (11): ${err}` });

        items11 = result["ns1:rows"]["ns1:item"].map((item) => {
          const fecha = item["ns1:fecha"][0]; // moment(item["ns1:fecha"][0], 'DD/MM/YYYY').format('YYYY-MM-DD')

          return {
            fecha: fecha,
            hora: item["ns1:hora"][0],
            servicio: item["ns1:servicio"][0],
            sentido: item["ns1:sentido"][0],
            patente: item["ns1:patente"][0],
            latitudgps: item["ns1:latitudgps"][0],
            longitudgps: item["ns1:longitudgps"][0],
            distancia_origen: item["ns1:distancia_origen"][0],
            velocidad_instantanea: item["ns1:velocidad_instantanea"][0],
            fecha_hora: `${fecha} ${item["ns1:hora"][0]}`,
          };
        });
      });
    }

    if (data13.includes("<ns1:item>")) {
      parser.parseString(result13, (err, result) => {
        if (err)
          return console.error({ error: `Error al convertir (13): ${err}` });

        items13 = result["ns1:rows"]["ns1:item"].map((item) => {
          const fecha = item["ns1:fecha"][0]; //moment(item["ns1:fecha"][0], 'DD/MM/YYYY').format('YYYY-MM-DD')

          return {
            fecha: fecha,
            hora: item["ns1:hora"][0],
            servicio: item["ns1:servicio"][0],
            sentido: item["ns1:sentido"][0],
            patente: item["ns1:patente"][0],
            latitudgps: item["ns1:latitudgps"][0],
            longitudgps: item["ns1:longitudgps"][0],
            distancia_origen: item["ns1:distancia_origen"][0],
            velocidad_instantanea: item["ns1:velocidad_instantanea"][0],
            fecha_hora: `${fecha} ${item["ns1:hora"][0]}`,
          };
        });
      });
    }

    guardarArchivo(data11, 11);
    guardarArchivo(data13, 13);

    if (items11.length > 0 || items13.length > 0) {
      //SE CONCATENAN AMBOS ARREGLOS
      itemsFull = items11.concat(items13);

      console.log(0);
      const pool11 = await getConnection();
      await pool11
        .request()
        .input("json", sql.NVarChar, JSON.stringify(itemsFull))
        .execute("sonda_procInsPosicionamientoApi");
      console.log(1);
      // Testing asíncrono

      if (!ejecutando) {
        insertarPosicionamientoTesting(itemsFull);
      }
    } else {
      escribir("No se encontraron registros de Sonda." + "\n");

      return console.log("No se encontraron registros de Sonda.");
    }

    let messageExito =
      `Posicionamiento almacenado exitosamente (Cantidad de items: ${
        items11.length + items13.length
      })` +
      ` a las: ` +
      getHoraActual();

    escribir(messageExito + "\n");

    return console.log({
      message: messageExito,
    });
  } catch (error) {
    console.log(error.message);

    const textoAAlmacenar = error.toString();

    escribir(getHoraActual() + "\n");
    escribir(textoAAlmacenar + " a las: " + getHoraActual() + "\n");
    escribir(error.stack + "\n");

    fechaUltimoEnvioError = enviarErrorCorreo(
      textoAAlmacenar,
      fechaUltimoEnvioError
    );
  }
};

const insertarPosicionamientoTesting = async (itemsFull) => {
  ejecutando = true;
  console.log("Iniciando testing");

  try {
    //El item 0 realiza un delete de la tabla sonda_pos_flota
    const pool12 = await getConnectionTesting();

    await pool12
      .request()
      .input("json", sql.NVarChar, JSON.stringify(itemsFull))
      .execute("sonda_procInsPosicionamientoApi");
  } catch (error) {
    console.log(error);

    const textoAAlmacenar = error.toString();

    escribirTesting(getHoraActual() + "\n");
    escribirTesting(textoAAlmacenar + " a las: " + getHoraActual() + "\n");
    escribirTesting(error.stack + "\n");
  } finally {
    console.log("Finalizado testing");
    ejecutando = false;
  }
};

obtenerPosicionamiento();

setInterval(obtenerPosicionamiento, 31 * 1000);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
