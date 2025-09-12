import api from '../lib/api';

export interface Registration {
  _id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'attended' | 'no_show';
  registeredAt: string;
  eventId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  year?: 'FE' | 'SE' | 'TE' | 'BE';
  branch?: 'Computer' | 'IT' | 'Electronics' | 'Mechanical' | 'Civil' | 'Electrical' | 'Other';
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegistrationData {
  eventId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  year?: string;
  branch?: string;
  additionalInfo?: string;
}

class RegistrationService {
  async createRegistration(data: CreateRegistrationData): Promise<{ status: string; message: string; data: { registration: Registration } }> {
    const response = await api.post('/registrations', data);
    return response.data;
  }

  async getEventRegistrations(eventId: string, page = 1, limit = 10): Promise<any> {
    const response = await api.get(`/registrations/event/${eventId}?page=${page}&limit=${limit}`);
    return response.data;
  }
}

export const registrationService = new RegistrationService();