'use client';

import { useAuth } from '@/context/AuthContext';
import { useSchedule } from '@/context/ScheduleContext';
import { BandMember } from '@/data/bandSchedule';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdjustCalendar from '@/components/band/AdjustCalendar';
import AvailabilityCalendar from '@/components/band/AvailabilityCalendar';

export default function AdjustPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { dateAvailabilities, adjustSettings, loading, addDateAvailability, addAdjustSettings } = useSchedule();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

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

  const handleRegisterDates = async (startDate: string, endDate: string, targetDates: string[]) => {
    await addAdjustSettings(startDate, endDate, targetDates);
  };

  const handleStatusChange = async (
    date: string,
    memberId: BandMember,
    status: 'available' | 'unavailable' | 'maybe' | null
  ) => {
    await addDateAvailability(date, memberId, status);
  };

  const handleHideDate = async (date: string) => {
    // Toggle hidden status for all members on this date
    const dateEntries = dateAvailabilities.filter(a => a.date === date);
    const isCurrentlyHidden = dateEntries.some(a => a.hidden === true);
    const newHiddenState = !isCurrentlyHidden;

    for (const entry of dateEntries) {
      await addDateAvailability(date, entry.memberId, entry.status, newHiddenState);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[2rem] font-serif text-fg mb-2">予定調節君</h1>
        <p className="text-fg-muted text-[0.95rem]">
          対象日を登録して、各メンバーの参加可否を入力してください
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

      {/* Step 1: Target Date Registration */}
      <div className="mb-8">
        <h2 className="text-[1.1rem] font-serif text-fg mb-4">ステップ 1: 対象日を登録</h2>
        <div className="vintage-card p-6">
          <AdjustCalendar onRegister={handleRegisterDates} />
        </div>
      </div>

      {/* Step 2: Registered Settings and Availability Input */}
      {adjustSettings.length > 0 ? (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.1rem] font-serif text-fg">ステップ 2: 参加可否を入力</h2>
            {dateAvailabilities.some(a => a.hidden) && (
              <label className="flex items-center gap-2 text-sm text-fg-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHidden}
                  onChange={(e) => setShowHidden(e.target.checked)}
                  className="cursor-pointer"
                />
                非表示済みを表示
              </label>
            )}
          </div>
          <div className="vintage-card p-6 overflow-auto">
            <div className="text-[0.85rem] text-fg-muted mb-4">
              セルをクリックして状態を切り替えます、日付行の「非表示」ボタンで日ごと非表示：
              <span className="ml-4">○ = 参加可能</span>
              <span className="ml-4">△ = 未定</span>
              <span className="ml-4">✕ = 参加不可</span>
            </div>
            <AvailabilityCalendar
              startDate={adjustSettings.reduce((min, s) => (s.startDate < min ? s.startDate : min), adjustSettings[0].startDate)}
              endDate={adjustSettings.reduce((max, s) => (s.endDate > max ? s.endDate : max), adjustSettings[0].endDate)}
              dateAvailabilities={dateAvailabilities}
              onStatusChange={handleStatusChange}
              onHideDate={handleHideDate}
              showHidden={showHidden}
            />
          </div>
        </div>
      ) : (
        <div className="vintage-card p-8 text-center text-fg-muted">
          <p>対象日を登録してください</p>
        </div>
      )}
    </div>
  );
}
