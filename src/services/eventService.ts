import api from '../lib/api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  shortDesc?: string;
  category: 'workshop' | 'seminar' | 'competition' | 'hackathon' | 'conference' | 'networking' | 'exhibition' | 'other';
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  maxCapacity?: number;
  registrationDeadline?: string;
  image: string;
  images?: string[];
  isActive: boolean;
  isFeatured: boolean;
  adminId: string;
  registrationCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  status: string;
  data: {
    events: Event[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface EventFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  featured?: boolean;
  upcoming?: boolean;
}

class EventService {
  async getAllEvents(filters: EventFilters = {}): Promise<EventsResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/events?${params.toString()}`);
    return response.data;
  }

  async getEvent(id: string): Promise<{ status: string; data: { event: Event } }> {
    const response = await api.get(`/events/${id}`);
    return response.data;
  }

  async getEventStats(): Promise<any> {
    const response = await api.get('/events/admin/stats');
    return response.data;
  }
}

export const eventService = new EventService();