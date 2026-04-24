'use client';

import { BandMember } from '@/data/bandSchedule';

interface DayCellProps {
  date: string;
  memberId: BandMember;
  status: 'available' | 'unavailable' | 'maybe' | null;
  onStatusChange: (date: string, memberId: BandMember, newStatus: 'available' | 'unavailable' | 'maybe') => void;
}

const getNextStatus = (
  current: 'available' | 'unavailable' | 'maybe' | null
): 'available' | 'unavailable' | 'maybe' => {
  switch (current) {
    case null:
    case 'available':
      return 'maybe';
    case 'maybe':
      return 'unavailable';
    case 'unavailable':
      return 'available';
  }
};

const statusSymbol = (status: 'available' | 'unavailable' | 'maybe' | null) => {
  switch (status) {
    case 'available':
      return '○';
    case 'unavailable':
      return '✕';
    case 'maybe':
      return '△';
    default:
      return '';
  }
};

const statusColor = (status: 'available' | 'unavailable' | 'maybe' | null) => {
  switch (status) {
    case 'available':
      return 'bg-green-700 text-white';
    case 'unavailable':
      return 'bg-red-700 text-white';
    case 'maybe':
      return 'bg-yellow-700 text-white';
    default:
      return 'bg-card-bg text-fg-muted border border-border';
  }
};

export default function DayCell({
  date,
  memberId,
  status,
  onStatusChange,
}: DayCellProps) {
  const handleClick = () => {
    const nextStatus = getNextStatus(status);
    onStatusChange(date, memberId, nextStatus);
  };

  return (
    <button
      onClick={handleClick}
      className={`h-16 flex items-center justify-center rounded-sm text-2xl font-medium transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent ${
        statusColor(status)
      }`}
      title={`${memberId} - ${date}`}
    >
      {statusSymbol(status)}
    </button>
  );
}
