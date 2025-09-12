import { useState, useEffect } from 'react';
import { eventService, Event, EventFilters } from '../services/eventService';

export const useEvents = (filters: EventFilters = {}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.getAllEvents(filters);
      setEvents(response.data.events);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [JSON.stringify(filters)]);

  return {
    events,
    loading,
    error,
    pagination,
    refetch: fetchEvents,
  };
};

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getEvent(id);
        setEvent(response.data.event);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch event');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return { event, loading, error };
};