import sql from "mssql";
import {
  DB_USER,
  DB_PASSWORD,
  DB_SERVER,
  DB_DATABASE,
  DB_PORT,
} from "./env.js";

const dbSettings = {
  user: "sa",
  password: "Io99G8#RD2Y8",
  server: "192.168.70.11",
  database: "RBU-DESPACHO",
  port: 2021,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    packetSize: 16368,
    requestTimeout: 60000,
    language: "Spanish",

    useUTC: false,
    dateFormat: "d/m/y", // Set the desired date format here
    datefirst: 1,
  },
};

const dbSettingsTesting = {
  user: "sa",
  password: "Server.,20255",
  server: "192.168.70.12",
  database: "RBU-DESPACHO",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    packetSize: 16368,
    requestTimeout: 60000,
    language: "Spanish",

    useUTC: false,
    dateFormat: "d/m/y", // Set the desired date format here
    datefirst: 1,
  },
};

export const getConnection = async () => {
  try {
    const pool = await new sql.ConnectionPool(dbSettings).connect();
    return pool;
  } catch (error) {
    console.log(`Error al conectar a la BBDD. Erro: ${error}`);
  }
};

export const getConnectionTesting = async () => {
  try {
    const pool = await new sql.ConnectionPool(dbSettingsTesting).connect();
    return pool;
  } catch (error) {
    console.log(`Error al conectar a la BBDD. Erro: ${error}`);
  }
};
