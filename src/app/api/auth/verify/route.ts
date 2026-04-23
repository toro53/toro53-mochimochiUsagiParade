import { verifySession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isAuthenticated = await verifySession();
    return NextResponse.json({ isAuthenticated });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { isAuthenticated: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
