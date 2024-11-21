import { useEffect, useState } from 'react';

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status == 401) {
                    setIsAuthenticated(false);
                }

                if (response.status == 200) {
                    const data = await response.json();
                    setUserId(data.id);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error checking authentication: ', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
    return { isAuthenticated, loading, userId };
}
