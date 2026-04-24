'use client';

import { useAuth } from '@/context/AuthContext';
import { useSchedule } from '@/context/ScheduleContext';
import { BandMember } from '@/data/bandSchedule';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PeriodPicker from '@/components/band/PeriodPicker';
import AvailabilityCalendar from '@/components/band/AvailabilityCalendar';

export default function AdjustPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { dateAvailabilities, loading, addDateAvailability } = useSchedule();
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  const handleStatusChange = async (
    date: string,
    memberId: BandMember,
    status: 'available' | 'unavailable' | 'maybe'
  ) => {
    await addDateAvailability(date, memberId, status);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[2rem] font-serif text-fg mb-2">予定調節君</h1>
        <p className="text-fg-muted text-[0.95rem]">
          期間を選択して、各日付のメンバーの参加可否を入力してください
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

      {/* Period Picker */}
      <div className="vintage-card p-6 mb-8">
        <h2 className="text-[1.1rem] font-serif text-fg mb-4">期間選択</h2>
        <PeriodPicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </div>

      {/* Calendar */}
      {startDate && endDate ? (
        <div className="vintage-card p-6 overflow-auto">
          <h2 className="text-[1.1rem] font-serif text-fg mb-4">
            参加可否入力
          </h2>
          <div className="text-[0.85rem] text-fg-muted mb-4">
            セルをクリックして状態を切り替えます：
            <span className="ml-4">○ = 参加可能</span>
            <span className="ml-4">△ = 未定</span>
            <span className="ml-4">✕ = 参加不可</span>
          </div>
          <AvailabilityCalendar
            startDate={startDate}
            endDate={endDate}
            dateAvailabilities={dateAvailabilities}
            onStatusChange={handleStatusChange}
          />
        </div>
      ) : (
        <div className="vintage-card p-8 text-center text-fg-muted">
          <p>開始日と終了日を選択して、カレンダーを表示します</p>
        </div>
      )}
    </div>
  );
}
