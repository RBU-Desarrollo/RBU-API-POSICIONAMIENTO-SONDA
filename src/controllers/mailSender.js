import nodemailer from "nodemailer";
import {
  EMAIL_SENDER,
  EMAIL_TO,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_PASSWORD,
} from "../config/env.js";

export async function sendEmail(html, toArray, subject) {
  try {
    const sender = EMAIL_SENDER;

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false, // usar STARTTLS en 587
      requireTLS: true, // <-- fuerza TLS (equivalente a EnableSsl = true)
      auth: {
        user: sender,
        pass: EMAIL_PASSWORD,
      },
      // opcional: tls: { rejectUnauthorized: true }
    });

    // Verifico conexión/credenciales antes de enviar (útil para debug)
    await transporter.verify();

    const info = await transporter.sendMail({
      from: sender,
      to: toArray,
      subject,
      text: html,
      priority: "high",
    });

    console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
}
