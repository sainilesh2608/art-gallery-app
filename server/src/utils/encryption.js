import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-32-byte-encryption-key-here";
const IV_LENGTH = 16; // Initialization vector length for AES

// Ensure key is exactly 32 bytes for AES-256
const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();

/**
 * Encrypt data using AES-256-CBC
 * @param {string|object} data - Data to encrypt
 * @returns {string} - Encrypted data in format: "iv:encryptedData" (base64)
 */
export const encryptData = (data) => {
  const plaintext = typeof data === "string" ? data : JSON.stringify(data);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Combine IV and encrypted data, then encode to base64
  return iv.toString("hex") + ":" + encrypted;
};

/**
 * Decrypt data using AES-256-CBC
 * @param {string} encryptedData - Encrypted data in format: "iv:encryptedData"
 * @returns {object} - Decrypted data parsed as JSON
 */
export const decryptData = (encryptedData) => {
  const parts = encryptedData.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encrypted = parts[1];

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  try {
    return JSON.parse(decrypted);
  } catch (e) {
    return decrypted;
  }
};

/**
 * Hash sensitive data
 * @param {string} data - Data to hash
 * @returns {string} - SHA256 hash
 */
export const hashData = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};
