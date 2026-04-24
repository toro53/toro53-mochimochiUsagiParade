'use client';

import { BAND_MEMBERS, BandMember, DateAvailability } from '@/data/bandSchedule';
import DayCell from './DayCell';

interface AvailabilityCalendarProps {
  startDate: string;
  endDate: string;
  dateAvailabilities: DateAvailability[];
  onStatusChange: (date: string, memberId: BandMember, status: 'available' | 'unavailable' | 'maybe' | null) => Promise<void>;
  onHideDate?: (date: string) => Promise<void>;
  showHidden?: boolean;
}

function getDatesInRange(startStr: string, endStr: string): string[] {
  const start = new Date(startStr + 'T00:00:00');
  const end = new Date(endStr + 'T00:00:00');
  const dates: string[] = [];

  const d = new Date(start);
  while (d <= end) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
    d.setDate(d.getDate() + 1);
  }

  return dates;
}

export default function AvailabilityCalendar({
  startDate,
  endDate,
  dateAvailabilities,
  onStatusChange,
  onHideDate,
  showHidden = false,
}: AvailabilityCalendarProps) {
  const dates = getDatesInRange(startDate, endDate);

  const getStatusForCell = (
    date: string,
    memberId: BandMember
  ): 'available' | 'unavailable' | 'maybe' | null => {
    const availability = dateAvailabilities.find(
      (a) => a.date === date && a.memberId === memberId
    );
    return availability ? availability.status : null;
  };

  const isDateHidden = (date: string): boolean => {
    return dateAvailabilities.some(
      (a) => a.date === date && a.hidden === true
    );
  };

  const visibleDates = showHidden
    ? dates
    : dates.filter((date) => !isDateHidden(date));

  if (dates.length === 0) {
    return (
      <div className="text-center text-fg-muted py-8">
        <p>期間を選択してください</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 bg-card-bg border border-border px-2 py-3 text-left text-[0.75rem] font-medium text-fg-muted uppercase tracking-wider">
              日付
            </th>
            {BAND_MEMBERS.map((member) => (
              <th
                key={member}
                className="border border-border px-1 py-3 text-center text-[0.65rem] font-medium text-fg-muted uppercase tracking-wider min-w-[50px]"
              >
                {member.substring(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleDates.map((date) => {
            const dateObj = new Date(date + 'T00:00:00');
            const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][
              dateObj.getDay()
            ];
            const displayDate = `${parseInt(date.split('-')[1])}/${parseInt(date.split('-')[2])}`;
            const hidden = isDateHidden(date);

            return (
              <tr key={date} style={{ height: '1.5rem' }} className={hidden ? 'opacity-50' : ''}>
                <td className="sticky left-0 border border-border p-0 text-sm font-medium text-fg-muted whitespace-nowrap">
                  <div className="bg-card-bg h-full flex items-center px-2 py-0">
                    <span>{displayDate}</span>
                  </div>
                </td>
                {BAND_MEMBERS.map((member) => (
                  <td
                    key={`${date}-${member}`}
                    className="border border-border p-0"
                    style={{ verticalAlign: 'middle', height: '1.5rem' }}
                  >
                    <DayCell
                      date={date}
                      memberId={member}
                      status={getStatusForCell(date, member)}
                      onStatusChange={onStatusChange}
                    />
                  </td>
                ))}
                {onHideDate && (
                  <td
                    className="border border-border p-0"
                    style={{ verticalAlign: 'middle', height: '1.5rem', width: '60px' }}
                  >
                    <button
                      onClick={() => onHideDate(date)}
                      className="h-full w-full flex items-center justify-center px-1 py-0 text-[0.6rem] border-none text-fg-muted hover:text-accent transition-colors"
                      title={hidden ? '表示' : '非表示'}
                    >
                      {hidden ? '表' : '非'}
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
