'use client';

import { useAuth } from '@/context/AuthContext';
import { useSchedule } from '@/context/ScheduleContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MemberAvailabilityForm from '@/components/band/MemberAvailabilityForm';
import AvailabilitySummary from '@/components/band/AvailabilitySummary';

export default function AdjustPage() {
  const { isAuthenticated } = useAuth();
  const { events, availabilities, loading, addAvailability } = useSchedule();
  const router = useRouter();
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/band');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (events.length > 0 && !selectedEventId) {
      setSelectedEventId(events[0].id);
    }
  }, [events, selectedEventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-fg-muted">読み込み中...</p>
      </div>
    );
  }

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-[960px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[2rem] font-serif text-fg mb-2">予定調節君</h1>
        <p className="text-fg-muted text-[0.95rem]">
          各イベントの参加可否を入力してください
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8">
        <a
          href="/band/schedule"
          className="px-6 py-3 border border-border text-fg-muted hover:border-accent hover:text-accent transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium"
        >
          スケジュールに戻る
        </a>
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/band');
          }}
          className="px-6 py-3 border border-border text-fg-muted hover:border-accent hover:text-accent transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium ml-auto"
        >
          ログアウト
        </button>
      </div>

      {events.length === 0 ? (
        <div className="vintage-card p-8 text-center text-fg-muted">
          <p>スケジュールがまだ登録されていません</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {/* Event Selector */}
          <div>
            <label className="block text-[0.8rem] text-fg-muted uppercase tracking-wider mb-3">
              イベント選択
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
            >
              {sortedEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} ({event.date})
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <>
              {/* Event Details */}
              <div className="vintage-card p-6">
                <h2 className="text-[1.3rem] font-serif text-fg mb-3">
                  {selectedEvent.title}
                </h2>
                <div className="grid gap-2 text-[0.9rem]">
                  <p className="text-fg-muted">
                    📅 {selectedEvent.date}
                    {selectedEvent.time && ` - ${selectedEvent.time}`}
                  </p>
                  {selectedEvent.location && (
                    <p className="text-fg-muted">📍 {selectedEvent.location}</p>
                  )}
                  {selectedEvent.notes && (
                    <p className="text-fg-muted italic">{selectedEvent.notes}</p>
                  )}
                </div>
              </div>

              {/* Availability Summary */}
              <AvailabilitySummary
                eventId={selectedEventId}
                availabilities={availabilities}
              />

              {/* Member Form */}
              <div>
                <h3 className="text-[1rem] text-fg mb-4 font-serif">
                  参加メンバーを入力
                </h3>
                <MemberAvailabilityForm
                  eventId={selectedEventId}
                  availabilities={availabilities}
                  onSubmit={(memberId, status, comment) =>
                    addAvailability(selectedEventId, memberId, status, comment)
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
