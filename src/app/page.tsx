'use client';
import styles from './style.module.css';
import useAuth from './hooks/useAuth';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div></div>;
    }

    const LogOutClick = async () => {
        await fetch('/api/logout');
        router.push('/login');
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>CSCI4300 Project</h1>
                <p>Congratulations! Your environment works!</p>
            </div>
            <div>
                <h2>Team Members</h2>
                <ul>
                    <li>Stephen Sulimani</li>
                    <li>Blake Voyles</li>
                    <li>Liam England</li>
                    <li>Timmy Thomas</li>
                </ul>
            </div>
            {isAuthenticated && (
                <div>
                    <button
                        className="flex items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                        onClick={LogOutClick}
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
