'use client';

import { useState, useMemo } from 'react';

interface AdjustCalendarProps {
  onRegister: (startDate: string, endDate: string, targetDates: string[]) => void;
}

export default function AdjustCalendar({ onRegister }: AdjustCalendarProps) {
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [displayMonth, setDisplayMonth] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const months = useMemo(() => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(displayMonth);
      date.setMonth(date.getMonth() + i);
      result.push(date);
    }
    return result;
  }, [displayMonth]);

  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const toggleDate = (dateStr: string) => {
    const newSet = new Set(selectedDates);
    if (newSet.has(dateStr)) {
      newSet.delete(dateStr);
    } else {
      newSet.add(dateStr);
    }
    setSelectedDates(newSet);
  };

  const handleRegister = () => {
    if (selectedDates.size === 0) {
      alert('対象日を選択してください');
      return;
    }

    const sortedDates = Array.from(selectedDates).sort();
    const startDate = sortedDates[0];
    const endDate = sortedDates[sortedDates.length - 1];
    const targetDates = sortedDates;

    onRegister(startDate, endDate, targetDates);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() =>
            setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1))
          }
          className="px-3 py-2 border border-border text-fg-muted hover:border-accent hover:text-accent transition-colors"
        >
          ← 前月
        </button>
        <h3 className="text-lg font-serif text-fg">対象日を選択</h3>
        <button
          onClick={() =>
            setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 3))
          }
          className="px-3 py-2 border border-border text-fg-muted hover:border-accent hover:text-accent transition-colors"
        >
          次月 →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {months.map((month, monthIdx) => {
          const year = month.getFullYear();
          const monthNum = month.getMonth();
          const days = daysInMonth(month);
          const firstDay = firstDayOfMonth(month);
          const monthName = month.toLocaleString('ja-JP', { month: 'long', year: 'numeric' });

          return (
            <div key={monthIdx} className="vintage-card p-4">
              <h4 className="font-serif text-fg mb-4 text-center">{monthName}</h4>

              <div className="grid grid-cols-7 gap-2">
                {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-fg-muted py-2">
                    {day}
                  </div>
                ))}

                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: days }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = formatDate(year, monthNum, day);
                  const isSelected = selectedDates.has(dateStr);

                  return (
                    <button
                      key={day}
                      onClick={() => toggleDate(dateStr)}
                      className={`h-10 flex items-center justify-center rounded-sm text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-accent text-card-bg font-bold ring-2 ring-accent'
                          : 'bg-card-bg border border-border text-fg hover:border-accent'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card-bg border border-border rounded-sm p-4 space-y-3">
        <div>
          <p className="text-sm text-fg-muted mb-2">選択済み日付: {selectedDates.size}日</p>
          {selectedDates.size > 0 && (
            <div className="text-xs text-fg-muted space-y-1">
              <p>
                期間: {Array.from(selectedDates).sort()[0]} 〜{' '}
                {Array.from(selectedDates).sort()[Array.from(selectedDates).sort().length - 1]}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleRegister}
          disabled={selectedDates.size === 0}
          className="w-full px-6 py-3 bg-accent text-card-bg font-medium rounded-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          この期間で対象日を登録
        </button>
      </div>
    </div>
  );
}
