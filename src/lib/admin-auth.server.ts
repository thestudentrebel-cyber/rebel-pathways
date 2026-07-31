import { createHmac, timingSafeEqual } from "crypto";

// Demo credentials for the initial application build.
// For production, replace with proper authentication + hashed secrets.
const ADMIN_USERNAME = "Admin1234";
const ADMIN_PASSWORD = "Admin1234@";

function secret(): string {
  return (
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ??
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    "rebel-media-hq-fallback"
  );
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(username: string, password: string): boolean {
  return safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

const TTL_MS = 1000 * 60 * 60 * 12;

export async function issueToken(): Promise<string> {
  const expires = Date.now() + TTL_MS;
  const payload = `admin.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, expires, signature] = parts;
  if (role !== "admin") return false;
  const exp = Number(expires);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return safeEqual(signature, sign(`${role}.${expires}`));
}
