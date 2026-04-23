'use client';

import { BandScheduleEvent, getEventTypeLabel, getEventTypeColor } from '@/data/bandSchedule';
import { useEffect } from 'react';

interface ScheduleDetailModalProps {
  event: BandScheduleEvent;
  onClose: () => void;
}

export default function ScheduleDetailModal({
  event,
  onClose,
}: ScheduleDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="vintage-card max-w-[500px] w-full p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[1.4rem] font-serif text-fg mb-2">
              {event.title}
            </h2>
            <span className={`inline-block text-[0.7rem] uppercase tracking-wider px-2 py-1 rounded-sm ${getEventTypeColor(event.type)}`}>
              {getEventTypeLabel(event.type)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-fg-muted hover:text-fg text-[1.5rem] leading-none"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-[0.9rem]">
          <div>
            <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
              日付
            </p>
            <p className="text-fg font-mono">{formatDate(event.date)}</p>
          </div>

          {event.time && (
            <div>
              <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
                時刻
              </p>
              <p className="text-fg font-mono">{event.time}</p>
            </div>
          )}

          {event.location && (
            <div>
              <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
                場所
              </p>
              <p className="text-fg">{event.location}</p>
            </div>
          )}

          {event.notes && (
            <div>
              <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
                備考
              </p>
              <p className="text-fg whitespace-pre-wrap">{event.notes}</p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-card-bg transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
