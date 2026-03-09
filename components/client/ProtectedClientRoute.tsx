import React from 'react';
import { Navigate } from 'react-router-dom';
import { useClientAuth } from '../../context/ClientAuthContext';

interface ProtectedClientRouteProps {
    children: React.ReactNode;
}

const ProtectedClientRoute: React.FC<ProtectedClientRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useClientAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/client-login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedClientRoute;
