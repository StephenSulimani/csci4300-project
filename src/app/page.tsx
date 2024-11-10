'use client';
import styles from './style.module.css';
import useAuth from './hooks/useAuth';
import { useRouter } from 'next/navigation';
import LogoutBtn from './components/LogoutBtn';

export default function Home() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div></div>;
    }

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
                    <LogoutBtn router={router} />
                </div>
            )}
        </div>
    );
}
