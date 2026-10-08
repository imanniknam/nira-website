import "server-only";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminRecord, getSessionSecret, saveAdminRecord } from "./db";

import { SESSION_COOKIE } from "./session-cookie";
const SESSION_TTL_S = 60 * 60 * 24 * 7;

function derive(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key.toString("hex")))),
  );
}

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
  const salt = randomBytes(16).toString("hex");
  return { salt, hash: await derive(password, salt) };
}

/** Initial credentials come from env until the account has been saved once. */
function bootstrapCreds() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password =
    process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "admin12345");
  return { username, password };
}

export async function checkCredentials(username: string, password: string): Promise<boolean> {
  const rec = await getAdminRecord();
  if (rec) {
    const hash = await derive(password, rec.salt);
    return safeEqual(username, rec.username) && safeEqual(hash, rec.hash);
  }
  const boot = bootstrapCreds();
  if (!boot.password) return false;
  const ok = safeEqual(username, boot.username) && safeEqual(password, boot.password);
  if (ok) await saveAdminRecord({ username: boot.username, ...(await hashPassword(password)) });
  return ok;
}

export async function adminUsername() {
  return (await getAdminRecord())?.username ?? bootstrapCreds().username;
}

export async function setPassword(newPassword: string) {
  const username = await adminUsername();
  await saveAdminRecord({ username, ...(await hashPassword(newPassword)) });
}

async function fingerprint() {
  const rec = await getAdminRecord();
  return rec ? rec.hash.slice(0, 12) : "boot";
}

async function sign(payload: string) {
  return createHmac("sha256", await getSessionSecret()).update(payload).digest("base64url");
}

async function makeToken() {
  const payload = `${Math.floor(Date.now() / 1000) + SESSION_TTL_S}.${await fingerprint()}`;
  return `${payload}.${await sign(payload)}`;
}

async function tokenValid(token: string | undefined) {
  if (!token) return false;
  const [exp, fp, sig] = token.split(".");
  if (!exp || !fp || !sig) return false;
  if (!safeEqual(sig, await sign(`${exp}.${fp}`))) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  return safeEqual(fp, await fingerprint());
}

async function isSecureRequest() {
  if (process.env.COOKIE_SECURE) return process.env.COOKIE_SECURE === "true";
  return (await headers()).get("x-forwarded-proto") === "https";
}

export async function startSession() {
  (await cookies()).set(SESSION_COOKIE, await makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: await isSecureRequest(),
    path: "/",
    maxAge: SESSION_TTL_S,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin() {
  return tokenValid((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Gate for every admin page and every admin server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
