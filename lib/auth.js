const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bufToHex(buf) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

function bytesToBase64Url(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacSign(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return bufToHex(sig);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export const ADMIN_COOKIE = "washero_admin";

const PBKDF2_ITERATIONS = 100000;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE_SECONDS;

// A hash of a random, unguessable password. Used so login always pays the
// same PBKDF2 cost whether or not the email exists, keeping response time
// from leaking which accounts are real.
export const DUMMY_PASSWORD_HASH =
  "pbkdf2$100000$5f6e1c2a9b3d4e5f60718293a4b5c6d7$" +
  "0000000000000000000000000000000000000000000000000000000000000000";

// ---------- password hashing (PBKDF2-SHA256, Web Crypto — Node + Edge safe) ----------

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    256
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${bufToHex(salt)}$${bufToHex(bits)}`;
}

export async function verifyPassword(password, stored) {
  const parts = (stored || "").split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;

  const iterations = parseInt(parts[1], 10);
  const salt = hexToBytes(parts[2]);
  const expectedHex = parts[3];

  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations, hash: "SHA-256" }, key, 256);
  return timingSafeEqual(bufToHex(bits), expectedHex);
}

// ---------- signed session tokens (carry uid/role/name, verifiable without a DB call) ----------

export async function createSessionToken({ uid, role, name }) {
  const secret = process.env.SESSION_SECRET || "dev-secret";
  const payload = JSON.stringify({ uid, role, name, exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 });
  const payloadB64 = bytesToBase64Url(encoder.encode(payload));
  const sig = await hmacSign(secret, payloadB64);
  return `${payloadB64}.${sig}`;
}

export async function readSession(token) {
  if (!token) return null;
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;

  const secret = process.env.SESSION_SECRET || "dev-secret";
  const expectedSig = await hmacSign(secret, payloadB64);
  if (!timingSafeEqual(sig, expectedSig)) return null;

  try {
    const payload = JSON.parse(decoder.decode(base64UrlToBytes(payloadB64)));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
