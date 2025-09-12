import { useState, useEffect } from 'react';
import { galleryService, GalleryImage, GalleryFilters } from '../services/galleryService';

export const useGallery = (filters: GalleryFilters = {}) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await galleryService.getAllImages(filters);
      setImages(response.data.images);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch gallery images');
      console.error('Error fetching gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [JSON.stringify(filters)]);

  return {
    images,
    loading,
    error,
    pagination,
    refetch: fetchImages,
  };
};