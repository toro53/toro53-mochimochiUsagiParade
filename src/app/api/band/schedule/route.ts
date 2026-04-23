import { kv } from '@vercel/kv';
import { BandScheduleEvent, initialScheduleEvents } from '@/data/bandSchedule';
import { NextRequest, NextResponse } from 'next/server';

const KV_KEY = 'band:schedule:events';

export async function GET() {
  try {
    const storedEvents = await kv.get<BandScheduleEvent[]>(KV_KEY);
    const events = storedEvents || initialScheduleEvents;
    return NextResponse.json({ events });
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
    const storedEvents = await kv.get<BandScheduleEvent[]>(KV_KEY);
    const events = storedEvents || [...initialScheduleEvents];
    events.push(event);
    await kv.set(KV_KEY, events);
    return NextResponse.json({ events });
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
    const storedEvents = await kv.get<BandScheduleEvent[]>(KV_KEY);
    const events = storedEvents || [...initialScheduleEvents];
    const index = events.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      events[index] = event;
    }
    await kv.set(KV_KEY, events);
    return NextResponse.json({ events });
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

    const storedEvents = await kv.get<BandScheduleEvent[]>(KV_KEY);
    const events = storedEvents || [...initialScheduleEvents];
    const filtered = events.filter((e) => e.id !== eventId);
    await kv.set(KV_KEY, filtered);
    return NextResponse.json({ events: filtered });
  } catch (error) {
    console.error('Failed to delete event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
