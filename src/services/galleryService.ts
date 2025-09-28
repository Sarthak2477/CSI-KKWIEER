import api from './api';

export interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  eventName?: string;
  category?: string;
  uploadedAt: string;
}

export const galleryService = {
  getAllImages: async (params?: any) => {
    const response = await api.get('/gallery', { params });
    return response.data;
  },

  getImage: async (id: string) => {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  },

  createImage: async (imageData: Partial<GalleryImage>) => {
    const response = await api.post('/gallery', imageData);
    return response.data;
  },

  updateImage: async (id: string, imageData: Partial<GalleryImage>) => {
    const response = await api.put(`/gallery/${id}`, imageData);
    return response.data;
  },

  deleteImage: async (id: string) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },

  uploadImage: async (file: File, imageData: Partial<GalleryImage>) => {
    const formData = new FormData();
    formData.append('image', file);
    Object.keys(imageData).forEach(key => {
      if (imageData[key as keyof GalleryImage]) {
        formData.append(key, imageData[key as keyof GalleryImage] as string);
      }
    });
    
    const response = await api.post('/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};