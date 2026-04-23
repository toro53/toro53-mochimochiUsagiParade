export const BAND_MEMBERS = [
  'toro4nba',
  'sinra_vansho',
  '芹井',
  'leo',
  '投身高架橋',
] as const;

export type BandMember = (typeof BAND_MEMBERS)[number];

export type ScheduleEventType = 'rehearsal' | 'performance' | 'meeting' | 'event';

export interface BandScheduleEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  location?: string;
  notes?: string;
  type: ScheduleEventType;
}

export const initialScheduleEvents: BandScheduleEvent[] = [
  {
    id: 'evt-001',
    title: 'M3-2026春 応募締切',
    date: '2026-05-15',
    time: '23:59',
    location: 'オンライン',
    type: 'event',
  },
  {
    id: 'evt-002',
    title: '新作レコーディング',
    date: '2026-06-01',
    time: '18:00',
    location: 'スタジオA',
    notes: '全メンバー参加予定',
    type: 'rehearsal',
  },
  {
    id: 'evt-003',
    title: 'ライブイベント出演',
    date: '2026-06-15',
    time: '19:00',
    location: 'ライブハウスB',
    type: 'performance',
  },
  {
    id: 'evt-004',
    title: 'メンバーミーティング',
    date: '2026-05-25',
    time: '20:00',
    location: 'オンライン',
    notes: '今後の活動について相談',
    type: 'meeting',
  },
];

export interface MemberAvailability {
  memberId: BandMember;
  eventId: string;
  status: 'available' | 'unavailable' | 'maybe';
  comment?: string;
}

export interface DateAvailability {
  date: string; // YYYY-MM-DD
  memberId: BandMember;
  status: 'available' | 'unavailable' | 'maybe';
}

export const getEventTypeLabel = (type: ScheduleEventType): string => {
  const labels: Record<ScheduleEventType, string> = {
    rehearsal: 'リハーサル',
    performance: 'ライブ',
    meeting: 'ミーティング',
    event: 'イベント',
  };
  return labels[type];
};

export const getEventTypeColor = (
  type: ScheduleEventType
): string => {
  const colors: Record<ScheduleEventType, string> = {
    rehearsal: 'bg-blue-900 text-blue-200',
    performance: 'bg-red-900 text-red-200',
    meeting: 'bg-green-900 text-green-200',
    event: 'bg-purple-900 text-purple-200',
  };
  return colors[type];
};
