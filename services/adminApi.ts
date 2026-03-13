import axios from 'axios';

// Get the raw URL from env or fallback
const RAW_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

// Ensure we have the "root" API URL (ending in /api) by stripping /v1 if present
// This is needed because some endpoints (like admin) don't use /v1, while others (like user/login) do.
const ROOT_API_URL = RAW_URL.replace(/\/v1\/?$/, '');

// Create a separate axios instance for admin requests
// Base URL will be something like http://127.0.0.1:8000/api
const adminApi = axios.create({
    baseURL: ROOT_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token
adminApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401/403
adminApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.warn("Unauthorized! Redirecting to login.");
            // Here you could implement refresh token logic if backend supports it
            // For now, we'll just logout
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userRole');
            window.location.href = '/secure-admin-7090/login'; // Updated to match new BrowserRouter paths
        }
        return Promise.reject(error);
    }
);

export const adminService = {
    login: async (credentials: any) => {
        // Login is under /v1/user/login/
        // We use ROOT_API_URL + /v1/user/login/
        const response = await axios.post(`${ROOT_API_URL}/v1/user/login/`, credentials);
        return response.data;
    },

    verifyOTP: async (data: { user_id: number; otp: string }) => {
        // Verify OTP is under /v1/user/verify-otp/
        const response = await axios.post(`${ROOT_API_URL}/v1/user/verify-otp/`, data);
        return response.data;
    },

    changePassword: async (data: any) => {
        const response = await adminApi.post('/v1/user/profile/change-password/', data);
        return response.data;
    },

    getUsers: async () => {
        // Admin routes are at /api/admin/...
        // So we use adminApi.get('/admin/users/') -> ROOT_API_URL + /admin/users/
        const response = await adminApi.get('/admin/users/');
        return response.data;
    },
    deleteUser: async (id: number | string) => {
        // Assuming default router maps DELETE to /admin/users/{id}/
        const response = await adminApi.delete(`/admin/users/${id}/`);
        return response.data;
    },

    getContacts: async () => {
        const response = await adminApi.get('/admin/contacts/');
        return response.data;
    },
    deleteContact: async (id: number | string) => {
        const response = await adminApi.delete(`/admin/contacts/${id}/`);
        return response.data;
    },
    bulkDeleteContacts: async (ids: (number | string)[]) => {
        const response = await adminApi.post('/admin/contacts/bulk-delete/', { ids });
        return response.data;
    },
    markContactAsRead: async (id: number | string) => {
        const response = await adminApi.post(`/admin/contacts/${id}/mark-read/`);
        return response.data;
    },

    getQuotes: async () => {
        const response = await adminApi.get('/admin/quotes/');
        return response.data;
    },
    deleteQuote: async (id: number | string) => {
        const response = await adminApi.delete(`/admin/quotes/${id}/`);
        return response.data;
    },
    bulkDeleteQuotes: async (ids: (number | string)[]) => {
        const response = await adminApi.post('/admin/quotes/bulk-delete/', { ids });
        return response.data;
    },
    markQuoteAsRead: async (id: number | string) => {
        const response = await adminApi.post(`/admin/quotes/${id}/mark-read/`);
        return response.data;
    },

    getServices: async () => {
        const response = await adminApi.get('/admin/services/');
        return response.data;
    },

    getPackages: async () => {
        const response = await adminApi.get('/admin/packages/');
        return response.data;
    },

    getServiceCategories: async () => {
        const response = await adminApi.get('/admin/service-categories/');
        return response.data;
    },

    getStats: async () => {
        const response = await adminApi.get('/admin/stats/');
        return response.data;
    },

    // CRUD for Services
    createService: async (data: any) => {
        const response = await adminApi.post('/admin/services/', data);
        return response.data;
    },
    updateService: async (id: number | string, data: any) => {
        const response = await adminApi.patch(`/admin/services/${id}/`, data);
        return response.data;
    },
    deleteService: async (id: number | string) => {
        const response = await adminApi.delete(`/admin/services/${id}/`);
        return response.data;
    },

    // CRUD for Packages
    createPackage: async (data: any) => {
        const response = await adminApi.post('/admin/packages/', data);
        return response.data;
    },
    updatePackage: async (id: number | string, data: any) => {
        const response = await adminApi.patch(`/admin/packages/${id}/`, data);
        return response.data;
    },
    deletePackage: async (id: number | string) => {
        const response = await adminApi.delete(`/admin/packages/${id}/`);
        return response.data;
    },

    // Jobs
    getJobs: async () => {
        const response = await adminApi.get('/v1/careers/jobs/');
        return response.data;
    },
    createJob: async (data: any) => {
        const response = await adminApi.post('/v1/careers/jobs/', data);
        return response.data;
    },
    updateJob: async (id: number | string, data: any) => {
        const response = await adminApi.patch(`/v1/careers/jobs/${id}/`, data);
        return response.data;
    },
    deleteJob: async (id: number | string) => {
        const response = await adminApi.delete(`/v1/careers/jobs/${id}/`);
        return response.data;
    },
    bulkDeleteJobs: async (ids: (number | string)[]) => {
        const response = await adminApi.post('/v1/careers/jobs/bulk-delete/', { ids });
        return response.data;
    },

    // Applications
    getApplications: async () => {
        const response = await adminApi.get('/v1/careers/applications/');
        return response.data;
    },
    updateApplication: async (id: number | string, data: any) => {
        const response = await adminApi.patch(`/v1/careers/applications/${id}/`, data);
        return response.data;
    },
    deleteApplication: async (id: number | string) => {
        const response = await adminApi.delete(`/v1/careers/applications/${id}/`);
        return response.data;
    },
    bulkDeleteApplications: async (ids: (number | string)[]) => {
        const response = await adminApi.post('/v1/careers/applications/bulk-delete/', { ids });
        return response.data;
    },

    // Projects
    getProjects: async () => {
        const response = await adminApi.get('/v1/projects/projects/');
        return response.data;
    },
    createProject: async (data: any) => {
        const response = await adminApi.post('/v1/projects/projects/', data);
        return response.data;
    },
    updateProject: async (id: number | string, data: any) => {
        const response = await adminApi.patch(`/v1/projects/projects/${id}/`, data);
        return response.data;
    },
    deleteProject: async (id: number | string) => {
        const response = await adminApi.delete(`/v1/projects/projects/${id}/`);
        return response.data;
    },
    bulkDeleteProjects: async (ids: (number | string)[]) => {
        const response = await adminApi.post('/v1/projects/projects/bulk-delete/', { ids });
        return response.data;
    },

    // Client Management
    createClientAccount: async (data: { email: string; first_name: string; last_name: string; phone: string }) => {
        // Correct URL is /v1/user/create-client/ (mapped in core/urls.py included under /v1/user/)
        const response = await adminApi.post('/v1/user/create-client/', data);
        return response.data;
    },

    // Portfolio Management
    getPortfolioItems: async () => {
        const response = await axios.get(`${ROOT_API_URL}/v1/portfolio/items/`);
        return response.data;
    },
    createPortfolioItem: async (data: FormData) => {
        const response = await adminApi.post('/v1/portfolio/items/', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    updatePortfolioItem: async (id: number | string, data: FormData) => {
        const response = await adminApi.patch(`/v1/portfolio/items/${id}/`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    deletePortfolioItem: async (id: number | string) => {
        const response = await adminApi.delete(`/v1/portfolio/items/${id}/`);
        return response.data;
    },
    bulkDeletePortfolioItems: async (ids: (number | string)[]) => {
        const response = await adminApi.post('/v1/portfolio/items/bulk-delete/', { ids });
        return response.data;
    }
};

export default adminApi;
