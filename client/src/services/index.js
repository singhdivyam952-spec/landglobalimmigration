import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

export const contentService = {
  get: () => api.get('/content'),
  update: (data) => api.put('/content', data),
};

export const serviceService = {
  getAll: (params) => api.get('/services', { params }),
  getOne: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  remove: (id) => api.delete(`/services/${id}`),
};

export const countryService = {
  getAll: (params) => api.get('/countries', { params }),
  getOne: (id) => api.get(`/countries/${id}`),
  create: (data) => api.post('/countries', data),
  update: (id, data) => api.put(`/countries/${id}`, data),
  remove: (id) => api.delete(`/countries/${id}`),
};

export const testimonialService = {
  getAll: (params) => api.get('/testimonials', { params }),
  getOne: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  remove: (id) => api.delete(`/testimonials/${id}`),
};

export const leadService = {
  create: (data) => api.post('/leads', data),
  getAll: () => api.get('/leads'),
  remove: (id) => api.delete(`/leads/${id}`),
  getDashboardStats: () => api.get('/leads/stats/dashboard'),
};

export const mediaService = {
  getAll: () => api.get('/media'),
  upload: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  replace: (id, file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.put(`/media/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove: (id) => api.delete(`/media/${id}`),
};
