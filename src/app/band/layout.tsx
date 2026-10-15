import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { ScheduleProvider } from '@/context/ScheduleContext';

// メンバー向けページなので検索結果に出さない
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ScheduleProvider>
        <div className="min-h-screen bg-bg text-fg">
          {children}
        </div>
      </ScheduleProvider>
    </AuthProvider>
  );
}
