import { setSessionCookie, verifySession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const CORRECT_PASSWORD = 'mochi23';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password !== CORRECT_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Set session cookie
    await setSessionCookie(true);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
