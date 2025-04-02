import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 2067;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_SERVER = process.env.DB_SERVER;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT || 2021;

export const API_USERNAME = process.env.API_USERNAME;
export const API_PASSWORD = process.env.API_PASSWORD;
