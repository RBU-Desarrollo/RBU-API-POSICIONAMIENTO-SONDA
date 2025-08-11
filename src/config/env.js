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

export const EMAIL_SENDER = process.env.EMAIL_SENDER;
export const EMAIL_TO = process.env.EMAIL_TO;
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
