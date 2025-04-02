import sql from "mssql";
import axios from "axios";
import tls, { CLIENT_RENEG_LIMIT } from "tls";
import xml2js from "xml2js";
import { getConnection } from "../config/db.js";
import {
  BASIC_AUTH_11,
  BASIC_AUTH_13,
  XML_AUTH_11,
  XML_AUTH_13,
} from "../config/api.js";
import moment from "moment";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

tls.DEFAULT_MIN_VERSION = "TLSv1";
tls.DEFAULT_MAX_VERSION = "TLSv1";

axios.defaults.baseURL =
  "https://200.71.222.43:8643/posicionamientoenlineaws/services";
axios.defaults.headers.common["Content-Type"] = "text/xml;charset=utf-8";
axios.defaults.headers.common["SOAPAction"] = '""';

export const testConnection = async (req, res) => {
	return res.status(200).json({ message: "No route" });

  /*try {
    const { data: data11 } = await axios.post(
      "/GetPosicionEnLineaPassSOAP",
      XML_AUTH_11,
      {
        auth: BASIC_AUTH_11,
      }
    );
    const { data: data13 } = await axios.post(
      "/GetPosicionEnLineaPassSOAP",
      XML_AUTH_13,
      {
        auth: BASIC_AUTH_13,
      }
    );

    if (!data11.includes("<ns1:item>"))
      return res.status(500).json({
        error: "Error al realizar la petición (11), intente de nuevo",
      });
    if (!data13.includes("<ns1:item>"))
      return res.status(500).json({
        error: "Error al realizar la petición (13), intente de nuevo",
      });

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

    const parser = new xml2js.Parser();
    let items11 = [];
    let items13 = [];

    parser.parseString(result11, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: `Error al convertir (11): ${err}` });

      items11 = result["ns1:rows"]["ns1:item"].map((item, i) => {
        return {
          fecha: item["ns1:fecha"][0],
          hora: item["ns1:hora"][0],
          servicio: item["ns1:servicio"][0],
          sentido: item["ns1:sentido"][0],
          patente: item["ns1:patente"][0],
          latitudgps: item["ns1:latitudgps"][0],
          longitudgps: item["ns1:longitudgps"][0],
          distancia_origen: item["ns1:distancia_origen"][0],
        };
      });
    });

    parser.parseString(result13, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: `Error al convertir (13): ${err}` });

      items13 = result["ns1:rows"]["ns1:item"].map((item, i) => {
        return {
          fecha: item["ns1:fecha"][0],
          hora: item["ns1:hora"][0],
          servicio: item["ns1:servicio"][0],
          sentido: item["ns1:sentido"][0],
          patente: item["ns1:patente"][0],
          latitudgps: item["ns1:latitudgps"][0],
          longitudgps: item["ns1:longitudgps"][0],
          distancia_origen: item["ns1:distancia_origen"][0],
        };
      });
    });

    // const pool = await getConnection();
    // await pool
    //   .request()
    //   .input("item", sql.TinyInt, 0)
    //   .execute("sonda_procDelPosicionamientoApi");

    await Promise.all(
      items11.map(async (item, i) => {
        const pool11 = await getConnection();
        await pool11
          .request()
          .input("item", sql.TinyInt, 0)
          .input("fecha", sql.NVarChar(10), moment(item.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          .input("hora", sql.VarChar(8), item.hora)
          .input("servicio", sql.VarChar(15), item.servicio)
          .input("sentido", sql.VarChar(1), item.sentido)
          .input("patente", sql.VarChar(7), item.patente)
          .input("latitudGps", sql.VarChar(20), item.latitudgps)
          .input("longitudGps", sql.VarChar(20), item.longitudgps)
          .input("distanciaOrigen", sql.VarChar(7), item.distancia_origen)
          .execute("sonda_procInsPosicionamientoApi");
      })
    );

    console.log("pool11 ", pool11)

    await Promise.all(
      items13.map(async (item) => {
        const pool13 = await getConnection();
        await pool13
          .request()
          .input("item", sql.TinyInt, 0)
          .input("fecha", sql.NVarChar(10), moment(item.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          .input("hora", sql.VarChar(8), item.hora)
          .input("servicio", sql.VarChar(15), item.servicio)
          .input("sentido", sql.VarChar(1), item.sentido)
          .input("patente", sql.VarChar(7), item.patente)
          .input("latitudGps", sql.VarChar(20), item.latitudgps)
          .input("longitudGps", sql.VarChar(20), item.longitudgps)
          .input("distanciaOrigen", sql.VarChar(7), item.distancia_origen)
          .execute("sonda_procInsPosicionamientoApi");
      })
    );

    console.log("pool13 ", pool13)

    const pool2 = await getConnection();
    await pool2.request().execute("sonda_procExeJobOrigen");   
    
    console.log("pool2", pool2)

    /*return res.status(200).json({
      message: `Posicionamiento almacenado exitosamente (Cantidad de items: ${
        items11.length + items13.length
      })`,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }*/
};
