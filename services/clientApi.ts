import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// Remove /v1 suffix to get the base API URL (e.g. .../api)
const BASE_API_URL = API_URL.replace(/\/v1\/?$/, '');

const getAuthHeaders = () => {
    const token = localStorage.getItem('clientToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const clientApi = {
    // Projects
    getProjects: async () => {
        const response = await axios.get(`${BASE_API_URL}/client/projects/`, getAuthHeaders());
        return response.data;
    },

    getProject: async (id: number) => {
        const response = await axios.get(`${BASE_API_URL}/client/projects/${id}/`, getAuthHeaders());
        return response.data;
    },

    // Quotes
    getQuotes: async () => {
        const response = await axios.get(`${BASE_API_URL}/client/quotes/`, getAuthHeaders());
        return response.data;
    },

    getQuote: async (id: number) => {
        const response = await axios.get(`${BASE_API_URL}/client/quotes/${id}/`, getAuthHeaders());
        return response.data;
    },

    // Payments
    getPayments: async () => {
        const response = await axios.get(`${BASE_API_URL}/client/payments/`, getAuthHeaders());
        return response.data;
    },

    getPayment: async (id: number) => {
        const response = await axios.get(`${BASE_API_URL}/client/payments/${id}/`, getAuthHeaders());
        return response.data;
    },

    // Profile
    updateProfile: async (data: any) => {
        const response = await axios.patch(`${API_URL}/user/profile/update/`, data, getAuthHeaders());
        return response.data;
    },

    changePassword: async (data: any) => {
        const response = await axios.post(`${API_URL}/user/profile/change-password/`, data, getAuthHeaders());
        return response.data;
    },
};
