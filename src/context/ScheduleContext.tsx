'use client';

import {
  BandScheduleEvent,
  MemberAvailability,
  DateAvailability,
  AdjustSettings,
  initialScheduleEvents,
  BAND_MEMBERS,
  BandMember,
} from '@/data/bandSchedule';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScheduleContextType {
  events: BandScheduleEvent[];
  availabilities: MemberAvailability[];
  dateAvailabilities: DateAvailability[];
  adjustSettings: AdjustSettings[];
  loading: boolean;
  addAvailability: (
    eventId: string,
    memberId: string,
    status: 'available' | 'unavailable' | 'maybe',
    comment?: string
  ) => Promise<void>;
  getEventAvailabilities: (eventId: string) => MemberAvailability[];
  addDateAvailability: (
    date: string,
    memberId: string,
    status: 'available' | 'unavailable' | 'maybe' | null,
    hidden?: boolean
  ) => Promise<void>;
  getAvailabilityForDate: (date: string) => DateAvailability[];
  addAdjustSettings: (
    startDate: string,
    endDate: string,
    targetDates?: string[]
  ) => Promise<void>;
  updateAdjustSettings: (id: string, settings: Partial<AdjustSettings>) => Promise<void>;
  getActiveAdjustSettings: () => AdjustSettings[];
  resetDateAvailabilities: () => Promise<void>;
  addEvent: (event: BandScheduleEvent) => Promise<void>;
  updateEvent: (event: BandScheduleEvent) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<BandScheduleEvent[]>([]);
  const [availabilities, setAvailabilities] = useState<MemberAvailability[]>(
    []
  );
  const [dateAvailabilities, setDateAvailabilities] = useState<DateAvailability[]>(
    []
  );
  const [adjustSettings, setAdjustSettings] = useState<AdjustSettings[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from KV on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch events
        const eventsRes = await fetch('/api/band/schedule');
        if (eventsRes.ok) {
          const data = await eventsRes.json();
          setEvents(data.events || initialScheduleEvents);
        } else {
          setEvents(initialScheduleEvents);
        }

        // Fetch availabilities
        const availRes = await fetch('/api/band/availabilities');
        if (availRes.ok) {
          const data = await availRes.json();
          setAvailabilities(data.availabilities || []);
        } else {
          setAvailabilities([]);
        }

        // Fetch date availabilities
        const dateAvailRes = await fetch('/api/band/availability-dates');
        if (dateAvailRes.ok) {
          const data = await dateAvailRes.json();
          setDateAvailabilities(data.availabilities || []);
        } else {
          setDateAvailabilities([]);
        }

        // Fetch adjust settings
        const adjustRes = await fetch('/api/band/adjust-settings');
        if (adjustRes.ok) {
          const data = await adjustRes.json();
          setAdjustSettings(data.settings || []);
        } else {
          setAdjustSettings([]);
        }
      } catch (error) {
        console.error('Failed to load schedule data:', error);
        setEvents(initialScheduleEvents);
        setAvailabilities([]);
        setAdjustSettings([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addAvailability = async (
    eventId: string,
    memberId: string,
    status: 'available' | 'unavailable' | 'maybe',
    comment?: string
  ) => {
    try {
      const response = await fetch('/api/band/availabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, memberId, status, comment }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvailabilities(data.availabilities);
      }
    } catch (error) {
      console.error('Failed to add availability:', error);
    }
  };

  const getEventAvailabilities = (eventId: string): MemberAvailability[] => {
    return availabilities.filter((a) => a.eventId === eventId);
  };

  const addDateAvailability = async (
    date: string,
    memberId: string,
    status: 'available' | 'unavailable' | 'maybe' | null,
    hidden?: boolean
  ) => {
    // 前の状態をバックアップして、楽観的更新を実行
    const previousState = dateAvailabilities;

    setDateAvailabilities(prev => {
      const existing = prev.findIndex(a => a.date === date && a.memberId === memberId);
      if (existing !== -1) {
        const updated = [...prev];
        if (status === null && hidden === undefined) {
          updated.splice(existing, 1);
        } else {
          const entry = { ...updated[existing] };
          if (status !== null) {
            entry.status = status;
          }
          if (hidden !== undefined) {
            entry.hidden = hidden;
          }
          updated[existing] = entry;
        }
        return updated;
      } else if (status !== null) {
        return [...prev, { date, memberId: memberId as BandMember, status, hidden: hidden ?? false }];
      }
      return prev;
    });

    // API呼び出し（非同期） - エラー時だけ前の状態に戻す
    try {
      const response = await fetch('/api/band/availability-dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, memberId, status, ...(hidden !== undefined && { hidden }) }),
      });

      if (!response.ok) {
        setDateAvailabilities(previousState);
      }
    } catch (error) {
      setDateAvailabilities(previousState);
      console.error('Failed to add date availability:', error);
    }
  };

  const getAvailabilityForDate = (date: string): DateAvailability[] => {
    return dateAvailabilities.filter((a) => a.date === date);
  };

  const addEvent = async (event: BandScheduleEvent) => {
    try {
      const response = await fetch('/api/band/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  const updateEvent = async (event: BandScheduleEvent) => {
    try {
      const response = await fetch('/api/band/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/band/schedule?id=${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const addAdjustSettings = async (
    startDate: string,
    endDate: string,
    targetDates?: string[]
  ) => {
    try {
      const response = await fetch('/api/band/adjust-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate, targetDates }),
      });

      if (response.ok) {
        const data = await response.json();
        setAdjustSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to add adjust settings:', error);
    }
  };

  const updateAdjustSettings = async (
    id: string,
    settings: Partial<AdjustSettings>
  ) => {
    try {
      const response = await fetch(`/api/band/adjust-settings?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        setAdjustSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to update adjust settings:', error);
    }
  };

  const getActiveAdjustSettings = (): AdjustSettings[] => {
    return adjustSettings.filter((s) => s.enabled);
  };

  const resetDateAvailabilities = async () => {
    try {
      // Delete all date availabilities
      const dateAvailRes = await fetch('/api/band/availability-dates', {
        method: 'DELETE',
      });

      // Delete all adjust settings
      const adjustRes = await fetch('/api/band/adjust-settings', {
        method: 'DELETE',
      });

      if (dateAvailRes.ok && adjustRes.ok) {
        setDateAvailabilities([]);
        setAdjustSettings([]);
      }
    } catch (error) {
      console.error('Failed to reset:', error);
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        events,
        availabilities,
        dateAvailabilities,
        adjustSettings,
        loading,
        addAvailability,
        getEventAvailabilities,
        addDateAvailability,
        getAvailabilityForDate,
        addAdjustSettings,
        updateAdjustSettings,
        getActiveAdjustSettings,
        resetDateAvailabilities,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within ScheduleProvider');
  }
  return context;
}
