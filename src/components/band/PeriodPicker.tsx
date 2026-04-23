'use client';

import { useState } from 'react';

interface PeriodPickerProps {
  onPeriodChange: (startDate: string, endDate: string) => void;
  defaultStartDate?: string;
  defaultEndDate?: string;
}

export default function PeriodPicker({
  onPeriodChange,
  defaultStartDate,
  defaultEndDate,
}: PeriodPickerProps) {
  const [startDate, setStartDate] = useState(defaultStartDate || '');
  const [endDate, setEndDate] = useState(defaultEndDate || '');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    if (newStart && endDate) {
      onPeriodChange(newStart, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    setEndDate(newEnd);
    if (startDate && newEnd) {
      onPeriodChange(startDate, newEnd);
    }
  };

  return (
    <div className="flex gap-4 items-end max-sm:flex-col">
      <div className="flex-1">
        <label className="block text-[0.8rem] text-fg-muted uppercase tracking-wider mb-2">
          開始日
        </label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
        />
      </div>
      <div className="flex-1">
        <label className="block text-[0.8rem] text-fg-muted uppercase tracking-wider mb-2">
          終了日
        </label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
        />
      </div>
    </div>
  );
}
