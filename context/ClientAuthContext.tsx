import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

interface ClientUser {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}

interface ClientAuthContextType {
    user: ClientUser | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<ClientUser>) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export const useClientAuth = () => {
    const context = useContext(ClientAuthContext);
    if (!context) {
        throw new Error('useClientAuth must be used within ClientAuthProvider');
    }
    return context;
};

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token on mount
        const storedToken = localStorage.getItem('clientToken');
        const storedUser = localStorage.getItem('clientUser');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/user/login/`, {
                username: username,
                password: password,
            });

            const { access, user: userData } = response.data;

            // Verify user is a client
            if (userData.role !== 'CLIENT') {
                throw new Error('Access denied. This portal is for clients only.');
            }

            setToken(access);
            setUser(userData);

            localStorage.setItem('clientToken', access);
            localStorage.setItem('clientUser', JSON.stringify(userData));
        } catch (error: any) {
            if (error.message.includes('Access denied')) {
                throw error;
            }
            throw new Error('Invalid username or password');
        }
    };

    const register = async (userData: any) => {
        try {
            await axios.post(`${API_URL}/user/register/`, userData);
            // Auto login after registration
            await login(userData.email, userData.password);
        } catch (error: any) {
            console.error("Registration Error:", error);
            let errorMessage = 'Registration failed';

            if (error.response) {
                const data = error.response.data;
                if (data) {
                    if (typeof data === 'string') {
                        errorMessage = data;
                    } else if (typeof data === 'object') {
                        if (data.detail) errorMessage = data.detail;
                        else if (data.message) errorMessage = data.message;
                        else {
                            const messages = Object.keys(data).map(key => {
                                const value = data[key];
                                const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
                                return Array.isArray(value) ? `${fieldName}: ${value.join(', ')}` : `${fieldName}: ${value}`;
                            });
                            errorMessage = messages.length > 0 ? messages.join('\n') : JSON.stringify(data);
                        }
                    }
                } else {
                    errorMessage = `Server Error (${error.response.status})`;
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Check your connection.';
            } else {
                errorMessage = error.message || errorMessage;
            }

            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('clientToken');
        localStorage.removeItem('clientUser');
    };

    const updateUser = (userData: Partial<ClientUser>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem('clientUser', JSON.stringify(updatedUser));
        }
    };

    return (
        <ClientAuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                updateUser,
                isAuthenticated: !!token && !!user,
                isLoading,
            }}
        >
            {children}
        </ClientAuthContext.Provider>
    );
};
