'use client';

interface PeriodPickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function PeriodPicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: PeriodPickerProps) {
  return (
    <div className="flex gap-4 items-end max-sm:flex-col">
      <div className="flex-1">
        <label className="block text-[0.8rem] text-fg-muted uppercase tracking-wider mb-2">
          開始日
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
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
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
        />
      </div>
    </div>
  );
}
