'use client';

import { BAND_MEMBERS, MemberAvailability } from '@/data/bandSchedule';
import { useState } from 'react';

interface MemberAvailabilityFormProps {
  eventId: string;
  availabilities: MemberAvailability[];
  onSubmit: (
    memberId: string,
    status: 'available' | 'unavailable' | 'maybe',
    comment?: string
  ) => void;
}

export default function MemberAvailabilityForm({
  eventId,
  availabilities,
  onSubmit,
}: MemberAvailabilityFormProps) {
  const [comments, setComments] = useState<Record<string, string>>({});

  const getAvailabilityForMember = (memberId: string) => {
    return availabilities.find(
      (a) => a.memberId === memberId && a.eventId === eventId
    );
  };

  const handleStatusChange = (
    memberId: string,
    status: 'available' | 'unavailable' | 'maybe'
  ) => {
    const comment = comments[memberId] || '';
    onSubmit(memberId, status, comment);
  };

  const handleCommentChange = (memberId: string, comment: string) => {
    setComments((prev) => ({ ...prev, [memberId]: comment }));
  };

  return (
    <div className="space-y-3">
      {BAND_MEMBERS.map((memberId) => {
        const avail = getAvailabilityForMember(memberId);
        const currentStatus = avail?.status || null;
        const currentComment = avail?.comment || '';

        return (
          <div key={memberId} className="vintage-card p-4">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-[0.95rem] text-fg font-medium min-w-[120px]">
                {memberId}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(memberId, 'available')}
                  className={`px-4 py-2 text-[0.75rem] font-medium transition-colors ${
                    currentStatus === 'available'
                      ? 'bg-green-700 text-green-100'
                      : 'border border-border text-fg-muted hover:border-green-700 hover:text-green-400'
                  }`}
                >
                  ○ 参加
                </button>
                <button
                  onClick={() => handleStatusChange(memberId, 'maybe')}
                  className={`px-4 py-2 text-[0.75rem] font-medium transition-colors ${
                    currentStatus === 'maybe'
                      ? 'bg-yellow-700 text-yellow-100'
                      : 'border border-border text-fg-muted hover:border-yellow-700 hover:text-yellow-400'
                  }`}
                >
                  △ 未定
                </button>
                <button
                  onClick={() => handleStatusChange(memberId, 'unavailable')}
                  className={`px-4 py-2 text-[0.75rem] font-medium transition-colors ${
                    currentStatus === 'unavailable'
                      ? 'bg-red-700 text-red-100'
                      : 'border border-border text-fg-muted hover:border-red-700 hover:text-red-400'
                  }`}
                >
                  ✕ 不参加
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder="コメント（任意）"
              value={currentComment}
              onChange={(e) => {
                const newComment = e.target.value;
                handleCommentChange(memberId, newComment);
                if (currentStatus) {
                  handleStatusChange(memberId, currentStatus);
                }
              }}
              className="w-full px-3 py-2 bg-card-bg border border-border text-fg text-[0.8rem] rounded-sm focus:outline-none focus:border-accent"
            />
          </div>
        );
      })}
    </div>
  );
}
