import { BandScheduleEvent, initialScheduleEvents } from '@/data/bandSchedule';
import { NextRequest, NextResponse } from 'next/server';

let inMemoryEvents = [...initialScheduleEvents];

export async function GET() {
  try {
    return NextResponse.json({ events: inMemoryEvents });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { events: initialScheduleEvents },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const event: BandScheduleEvent = await req.json();
    inMemoryEvents.push(event);
    return NextResponse.json({ events: inMemoryEvents });
  } catch (error) {
    console.error('Failed to add event:', error);
    return NextResponse.json(
      { error: 'Failed to add event' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const event: BandScheduleEvent = await req.json();
    const index = inMemoryEvents.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      inMemoryEvents[index] = event;
    }
    return NextResponse.json({ events: inMemoryEvents });
  } catch (error) {
    console.error('Failed to update event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID required' },
        { status: 400 }
      );
    }

    inMemoryEvents = inMemoryEvents.filter((e) => e.id !== eventId);
    return NextResponse.json({ events: inMemoryEvents });
  } catch (error) {
    console.error('Failed to delete event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
