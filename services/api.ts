import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const submitContact = async (data: any) => {
    return await api.post('/quotes/contact/', data);
};

export const submitQuote = async (data: any) => {
    // Ensure selected_services is sent as a list of strings if expected by backend
    return await api.post('/quotes/request/', data);
};

export const submitJobApplication = async (formData: FormData) => {
    return await api.post('/careers/applications/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getJobs = async () => {
    const response = await api.get('/careers/jobs/');
    // Backend JobListingViewSet list/retrieve are AllowAny
    return response.data;
};

export const getJob = async (id: number | string) => {
    const response = await api.get(`/careers/jobs/${id}/`);
    return response.data;
};

export default api;
