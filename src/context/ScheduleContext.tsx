'use client';

import {
  BandScheduleEvent,
  MemberAvailability,
  initialScheduleEvents,
  BAND_MEMBERS,
} from '@/data/bandSchedule';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScheduleContextType {
  events: BandScheduleEvent[];
  availabilities: MemberAvailability[];
  loading: boolean;
  addAvailability: (
    eventId: string,
    memberId: string,
    status: 'available' | 'unavailable' | 'maybe',
    comment?: string
  ) => Promise<void>;
  getEventAvailabilities: (eventId: string) => MemberAvailability[];
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
      } catch (error) {
        console.error('Failed to load schedule data:', error);
        setEvents(initialScheduleEvents);
        setAvailabilities([]);
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

  return (
    <ScheduleContext.Provider
      value={{
        events,
        availabilities,
        loading,
        addAvailability,
        getEventAvailabilities,
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
