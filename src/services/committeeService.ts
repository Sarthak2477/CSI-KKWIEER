import api from '../lib/api';

export interface CommitteeMember {
  _id: string;
  name: string;
  position: 'President' | 'Vice-President' | 'Secretary' | 'Joint-Secretary' | 'Treasurer' | 'Joint Treasurer' | 'Editorial Team' | 'Social Media Team' | 'Creative Team' | 'Technical Team' | 'Core Committee';
  year: string;
  email?: string;
  linkedin?: string;
  image: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeMembersResponse {
  status: string;
  data: {
    members: CommitteeMember[];
    availableYears: string[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface CommitteeFilters {
  page?: number;
  limit?: number;
  year?: string;
  position?: string;
}

class CommitteeService {
  async getAllMembers(filters: CommitteeFilters = {}): Promise<CommitteeMembersResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/committee-members?${params.toString()}`);
    return response.data;
  }

  async getMember(id: string): Promise<{ status: string; data: { member: CommitteeMember } }> {
    const response = await api.get(`/committee-members/${id}`);
    return response.data;
  }
}

export const committeeService = new CommitteeService();