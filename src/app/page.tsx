import Image from 'next/image';
import styles from './style.module.css';

export default function Home() {
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
        </div>
    );
}
