import { MemberAvailability } from '@/data/bandSchedule';
import { NextRequest, NextResponse } from 'next/server';

let inMemoryAvailabilities: MemberAvailability[] = [];

export async function GET() {
  try {
    return NextResponse.json({ availabilities: inMemoryAvailabilities });
  } catch (error) {
    console.error('Failed to fetch availabilities:', error);
    return NextResponse.json({ availabilities: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { eventId, memberId, status, comment } = await req.json();

    const index = inMemoryAvailabilities.findIndex(
      (a) => a.eventId === eventId && a.memberId === memberId
    );

    const newAvailability: MemberAvailability = {
      memberId,
      eventId,
      status,
      comment,
    };

    if (index !== -1) {
      inMemoryAvailabilities[index] = newAvailability;
    } else {
      inMemoryAvailabilities.push(newAvailability);
    }

    return NextResponse.json({ availabilities: inMemoryAvailabilities });
  } catch (error) {
    console.error('Failed to add availability:', error);
    return NextResponse.json(
      { error: 'Failed to add availability' },
      { status: 500 }
    );
  }
}
