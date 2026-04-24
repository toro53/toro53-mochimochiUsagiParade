import { kv } from '@vercel/kv';
import { AdjustSettings } from '@/data/bandSchedule';
import { NextResponse } from 'next/server';

const KV_KEY = 'band:schedule:adjust-settings';

function generateId(): string {
  return `adjust-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function GET() {
  try {
    const settings = await kv.get<AdjustSettings[]>(KV_KEY);
    return NextResponse.json({ settings: settings || [] });
  } catch (error) {
    console.error('Failed to fetch adjust settings:', error);
    return NextResponse.json({ settings: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startDate, endDate, targetDates } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    const settings = await kv.get<AdjustSettings[]>(KV_KEY) || [];

    const newSetting: AdjustSettings = {
      id: generateId(),
      startDate,
      endDate,
      targetDates,
      createdAt: new Date().toISOString(),
      enabled: true,
    };

    settings.push(newSetting);
    await kv.set(KV_KEY, settings);

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Failed to add adjust settings:', error);
    return NextResponse.json(
      { error: 'Failed to add adjust settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'id is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const settings = await kv.get<AdjustSettings[]>(KV_KEY) || [];

    const index = settings.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      );
    }

    settings[index] = { ...settings[index], ...body };
    await kv.set(KV_KEY, settings);

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Failed to update adjust settings:', error);
    return NextResponse.json(
      { error: 'Failed to update adjust settings' },
      { status: 500 }
    );
  }
}
