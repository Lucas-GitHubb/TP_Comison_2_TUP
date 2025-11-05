import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generateRawToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex"); // token plano para enviar por mail
}

export async function hashToken(rawToken) {
  const saltRounds = 10;
  return bcrypt.hash(rawToken, saltRounds);
}

export async function compareToken(rawToken, tokenHash) {
  return bcrypt.compare(rawToken, tokenHash);
}
