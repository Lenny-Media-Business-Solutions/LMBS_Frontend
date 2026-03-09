import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminService } from '../services/adminApi';

interface User {
    username: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    role: string | null;
    isAuthenticated: boolean;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [role, setRole] = useState<string | null>(localStorage.getItem('userRole'));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Initial check or validation could go here
        // For now, if we have a token, we assume logged in until 401
        setIsLoading(false);
    }, []);

    const login = async (credentials: any) => {
        setIsLoading(true);
        try {
            const data = await adminService.login(credentials);
            // Assuming response structure: { access: '...', user: { role: 'ADMIN', ... } }
            // Adjust based on actual backend response

            const accessToken = data.access || data.token;
            const userRole = data.user?.role || data.role; // Fallback

            if (userRole !== 'ADMIN') {
                throw new Error('Access denied. Admin rights required.');
            }

            setToken(accessToken);
            setRole(userRole);
            setUser(data.user);

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userRole', userRole);
            if (data.user) {
                localStorage.setItem('userData', JSON.stringify(data.user));
            }
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            role,
            isAuthenticated: !!token,
            login,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
