import crypto from 'crypto';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.SESSION_SECRET || 'dev-secret-key';
const COOKIE_NAME = 'bandmembers_session';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

interface SessionData {
  isAuthenticated: boolean;
  authenticatedAt: number;
}

function signSessionData(data: SessionData): string {
  const json = JSON.stringify(data);
  const encoded = Buffer.from(json).toString('base64');
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(encoded);
  const signature = hmac.digest('hex');
  return `${encoded}.${signature}`;
}

function verifySignature(sessionCookie: string): SessionData | null {
  try {
    const [encoded, signature] = sessionCookie.split('.');
    if (!encoded || !signature) return null;

    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(encoded);
    const expectedSig = hmac.digest('hex');

    if (signature !== expectedSig) return null;

    const json = Buffer.from(encoded, 'base64').toString();
    const data = JSON.parse(json) as SessionData;

    // Check if session is still valid (within 30 days)
    const now = Date.now();
    const ageMs = now - data.authenticatedAt;
    const ageSeconds = ageMs / 1000;

    if (ageSeconds > SESSION_MAX_AGE) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return false;
  }

  const data = verifySignature(sessionCookie);
  return data?.isAuthenticated ?? false;
}

export async function setSessionCookie(verified: boolean): Promise<void> {
  const cookieStore = await cookies();

  if (!verified) {
    cookieStore.delete(COOKIE_NAME);
    return;
  }

  const sessionData: SessionData = {
    isAuthenticated: true,
    authenticatedAt: Date.now(),
  };

  const signedCookie = signSessionData(sessionData);

  cookieStore.set(COOKIE_NAME, signedCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
