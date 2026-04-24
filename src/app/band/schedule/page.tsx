'use client';

import { useAuth } from '@/context/AuthContext';
import { useSchedule } from '@/context/ScheduleContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScheduleCard from '@/components/band/ScheduleCard';
import ScheduleDetailModal from '@/components/band/ScheduleDetailModal';
import { BandScheduleEvent } from '@/data/bandSchedule';

export default function SchedulePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { events, loading } = useSchedule();
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<BandScheduleEvent | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading && !isAuthenticated) {
      router.push('/band');
    }
  }, [isAuthenticated, authLoading, router, mounted]);

  if (!mounted || authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-fg-muted">読み込み中...</p>
      </div>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-[960px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[2rem] font-serif text-fg mb-2">
          バンドスケジュール
        </h1>
        <p className="text-fg-muted text-[0.95rem]">
          今後の予定を確認して、予定調節君で参加可否を入力してください
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8">
        <a
          href="/band/adjust"
          className="px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-card-bg transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium"
        >
          予定調節君へ
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

      {/* Events List */}
      {sortedEvents.length === 0 ? (
        <div className="vintage-card p-8 text-center text-fg-muted">
          <p>スケジュールがまだ登録されていません</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedEvents.map((event) => (
            <ScheduleCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedEvent && (
        <ScheduleDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
