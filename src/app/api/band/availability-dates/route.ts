import { kv } from '@vercel/kv';
import { DateAvailability } from '@/data/bandSchedule';
import { NextRequest, NextResponse } from 'next/server';

const KV_KEY = 'band:schedule:availability-dates';

export async function GET() {
  try {
    const storedAvailabilities = await kv.get<DateAvailability[]>(KV_KEY);
    const availabilities = storedAvailabilities || [];
    return NextResponse.json({ availabilities });
  } catch (error) {
    console.error('Failed to fetch date availabilities:', error);
    return NextResponse.json({ availabilities: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { date, memberId, status, hidden } = await req.json();
    const storedAvailabilities = await kv.get<DateAvailability[]>(KV_KEY);
    const availabilities = storedAvailabilities || [];

    const index = availabilities.findIndex(
      (a) => a.date === date && a.memberId === memberId
    );

    const newAvailability: DateAvailability = {
      date,
      memberId,
      status,
      ...(hidden !== undefined && { hidden }),
    };

    if (index !== -1) {
      availabilities[index] = newAvailability;
    } else {
      availabilities.push(newAvailability);
    }

    await kv.set(KV_KEY, availabilities);
    return NextResponse.json({ availabilities });
  } catch (error) {
    console.error('Failed to add date availability:', error);
    return NextResponse.json(
      { error: 'Failed to add date availability' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await kv.del(KV_KEY);
    return NextResponse.json({ availabilities: [] });
  } catch (error) {
    console.error('Failed to reset date availabilities:', error);
    return NextResponse.json(
      { error: 'Failed to reset date availabilities' },
      { status: 500 }
    );
  }
}
