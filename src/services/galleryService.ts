import api from '../lib/api';

export interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  eventName?: string;
  category?: 'workshop' | 'seminar' | 'competition' | 'hackathon' | 'conference' | 'networking' | 'exhibition' | 'other';
  isActive: boolean;
  uploadedAt: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryResponse {
  status: string;
  data: {
    images: GalleryImage[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface GalleryFilters {
  page?: number;
  limit?: number;
  category?: string;
  eventName?: string;
}

class GalleryService {
  async getAllImages(filters: GalleryFilters = {}): Promise<GalleryResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/gallery?${params.toString()}`);
    return response.data;
  }

  async getImage(id: string): Promise<{ status: string; data: { image: GalleryImage } }> {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  }
}

export const galleryService = new GalleryService();