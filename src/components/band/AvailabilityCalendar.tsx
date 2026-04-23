'use client';

import { BAND_MEMBERS, BandMember, DateAvailability } from '@/data/bandSchedule';
import DayCell from './DayCell';

interface AvailabilityCalendarProps {
  startDate: string;
  endDate: string;
  dateAvailabilities: DateAvailability[];
  onStatusChange: (date: string, memberId: BandMember, status: 'available' | 'unavailable' | 'maybe') => void;
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
            <th className="sticky left-0 bg-card-bg border border-border px-4 py-3 text-left text-[0.85rem] font-medium text-fg-muted uppercase tracking-wider">
              日付
            </th>
            {BAND_MEMBERS.map((member) => (
              <th
                key={member}
                className="border border-border px-4 py-3 text-center text-[0.75rem] font-medium text-fg-muted uppercase tracking-wider min-w-[80px]"
              >
                {member}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const dateObj = new Date(date + 'T00:00:00');
            const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][
              dateObj.getDay()
            ];
            const displayDate = `${date.split('-')[1]}/${date.split('-')[2]} (${dayOfWeek})`;

            return (
              <tr key={date}>
                <td className="sticky left-0 bg-card-bg border border-border px-4 py-3 text-sm font-medium text-fg-muted whitespace-nowrap">
                  {displayDate}
                </td>
                {BAND_MEMBERS.map((member) => (
                  <td
                    key={`${date}-${member}`}
                    className="border border-border p-2"
                  >
                    <DayCell
                      date={date}
                      memberId={member}
                      status={getStatusForCell(date, member)}
                      onStatusChange={onStatusChange}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
