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
          <h2 className="text-[1.1rem] font-serif text-fg mb-4">ステップ 2: 参加可否を入力</h2>
          <div className="space-y-8">
            {adjustSettings.map((setting) => (
              <div key={setting.id} className="vintage-card p-6 overflow-auto">
                <div className="mb-4">
                  <h3 className="font-serif text-fg mb-2">
                    {setting.startDate} 〜 {setting.endDate}
                  </h3>
                  {setting.description && (
                    <p className="text-sm text-fg-muted">{setting.description}</p>
                  )}
                </div>
                <div className="text-[0.85rem] text-fg-muted mb-4">
                  セルをクリックして状態を切り替えます：
                  <span className="ml-4">○ = 参加可能</span>
                  <span className="ml-4">△ = 未定</span>
                  <span className="ml-4">✕ = 参加不可</span>
                </div>
                <AvailabilityCalendar
                  startDate={setting.startDate}
                  endDate={setting.endDate}
                  dateAvailabilities={dateAvailabilities}
                  onStatusChange={handleStatusChange}
                />
              </div>
            ))}
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
