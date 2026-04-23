import { AuthProvider } from '@/context/AuthContext';
import { ScheduleProvider } from '@/context/ScheduleContext';

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
