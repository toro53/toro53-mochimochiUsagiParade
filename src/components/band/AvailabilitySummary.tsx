'use client';

import { BAND_MEMBERS, MemberAvailability } from '@/data/bandSchedule';

interface AvailabilitySummaryProps {
  eventId: string;
  availabilities: MemberAvailability[];
}

export default function AvailabilitySummary({
  eventId,
  availabilities,
}: AvailabilitySummaryProps) {
  const eventAvails = availabilities.filter((a) => a.eventId === eventId);

  const counts = {
    available: eventAvails.filter((a) => a.status === 'available').length,
    maybe: eventAvails.filter((a) => a.status === 'maybe').length,
    unavailable: eventAvails.filter((a) => a.status === 'unavailable').length,
    unanswered: BAND_MEMBERS.length - eventAvails.length,
  };

  return (
    <div className="vintage-card p-6">
      <h3 className="text-[1.1rem] text-fg font-serif mb-4">参加状況</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="text-center">
          <p className="text-[0.8rem] text-fg-muted uppercase tracking-wider mb-1">
            参加
          </p>
          <p className="text-[1.8rem] font-bold text-green-400">{counts.available}</p>
          <p className="text-[0.7rem] text-fg-muted">人</p>
        </div>
        <div className="text-center">
          <p className="text-[0.8rem] text-fg-muted uppercase tracking-wider mb-1">
            未定
          </p>
          <p className="text-[1.8rem] font-bold text-yellow-400">{counts.maybe}</p>
          <p className="text-[0.7rem] text-fg-muted">人</p>
        </div>
        <div className="text-center">
          <p className="text-[0.8rem] text-fg-muted uppercase tracking-wider mb-1">
            不参加
          </p>
          <p className="text-[1.8rem] font-bold text-red-400">
            {counts.unavailable}
          </p>
          <p className="text-[0.7rem] text-fg-muted">人</p>
        </div>
        <div className="text-center">
          <p className="text-[0.8rem] text-fg-muted uppercase tracking-wider mb-1">
            未回答
          </p>
          <p className="text-[1.8rem] font-bold text-fg-muted">
            {counts.unanswered}
          </p>
          <p className="text-[0.7rem] text-fg-muted">人</p>
        </div>
      </div>
    </div>
  );
}
