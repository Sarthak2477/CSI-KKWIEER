import api from './api';

export interface CommitteeMember {
  _id: string;
  name: string;
  position: string;
  year: string;
  email?: string;
  linkedin?: string;
  image: string;
  description?: string;
}

export const committeeService = {
  getAllMembers: async (params?: any) => {
    const response = await api.get('/committee-members', { params });
    return response.data;
  },

  getMember: async (id: string) => {
    const response = await api.get(`/committee-members/${id}`);
    return response.data;
  },

  createMember: async (memberData: Partial<CommitteeMember>) => {
    const response = await api.post('/committee-members', memberData);
    return response.data;
  },

  updateMember: async (id: string, memberData: Partial<CommitteeMember>) => {
    const response = await api.put(`/committee-members/${id}`, memberData);
    return response.data;
  },

  deleteMember: async (id: string) => {
    const response = await api.delete(`/committee-members/${id}`);
    return response.data;
  },
};