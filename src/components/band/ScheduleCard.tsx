'use client';

import { BandScheduleEvent, getEventTypeLabel, getEventTypeColor } from '@/data/bandSchedule';

interface ScheduleCardProps {
  event: BandScheduleEvent;
  onClick: () => void;
}

export default function ScheduleCard({ event, onClick }: ScheduleCardProps) {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}`;
  };

  return (
    <div
      onClick={onClick}
      className="vintage-card p-5 cursor-pointer hover:border-accent transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-[0.95rem] text-fg font-medium mb-1">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-[0.75rem] text-fg-muted">
            <span className="font-mono">{formatDate(event.date)}</span>
            {event.time && <span className="font-mono">{event.time}</span>}
          </div>
        </div>
        <span className={`text-[0.65rem] uppercase tracking-wider px-2 py-1 rounded-sm ${getEventTypeColor(event.type)}`}>
          {getEventTypeLabel(event.type)}
        </span>
      </div>

      {event.location && (
        <p className="text-[0.8rem] text-fg-muted mb-2">📍 {event.location}</p>
      )}

      {event.notes && (
        <p className="text-[0.8rem] text-fg-muted italic line-clamp-2">
          {event.notes}
        </p>
      )}
    </div>
  );
}
