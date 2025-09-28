import api from './api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  startDate: string;
  startTime: string;
  endTime?: string;
  location: string;
  maxCapacity?: number;
  participants: number;
  attendees: number;
  image: string;
  images: string[];
  isFeatured: boolean;
}

export const eventService = {
  getAllEvents: async (params?: any) => {
    const response = await api.get('/events', { params });
    return response.data;
  },

  getEvent: async (id: string) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData: Partial<Event>) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  updateEvent: async (id: string, eventData: Partial<Event>) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};