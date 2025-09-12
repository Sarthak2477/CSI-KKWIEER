import { useState, useEffect } from 'react';
import { committeeService, CommitteeMember, CommitteeFilters } from '../services/committeeService';

export const useCommitteeMembers = (filters: CommitteeFilters = {}) => {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0,
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await committeeService.getAllMembers(filters);
      setMembers(response.data.members);
      setAvailableYears(response.data.availableYears);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch committee members');
      console.error('Error fetching committee members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [JSON.stringify(filters)]);

  return {
    members,
    availableYears,
    loading,
    error,
    pagination,
    refetch: fetchMembers,
  };
};