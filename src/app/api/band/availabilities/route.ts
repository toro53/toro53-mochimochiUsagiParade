import { kv } from '@vercel/kv';
import { MemberAvailability } from '@/data/bandSchedule';
import { NextRequest, NextResponse } from 'next/server';

const KV_KEY = 'band:schedule:availabilities';

export async function GET() {
  try {
    const storedAvailabilities = await kv.get<MemberAvailability[]>(KV_KEY);
    const availabilities = storedAvailabilities || [];
    return NextResponse.json({ availabilities });
  } catch (error) {
    console.error('Failed to fetch availabilities:', error);
    return NextResponse.json({ availabilities: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { eventId, memberId, status, comment } = await req.json();
    const storedAvailabilities = await kv.get<MemberAvailability[]>(KV_KEY);
    const availabilities = storedAvailabilities || [];

    const index = availabilities.findIndex(
      (a) => a.eventId === eventId && a.memberId === memberId
    );

    const newAvailability: MemberAvailability = {
      memberId,
      eventId,
      status,
      comment,
    };

    if (index !== -1) {
      availabilities[index] = newAvailability;
    } else {
      availabilities.push(newAvailability);
    }

    await kv.set(KV_KEY, availabilities);
    return NextResponse.json({ availabilities });
  } catch (error) {
    console.error('Failed to add availability:', error);
    return NextResponse.json(
      { error: 'Failed to add availability' },
      { status: 500 }
    );
  }
}
