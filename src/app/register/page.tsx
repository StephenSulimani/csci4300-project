'use client';

// Register.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const resp = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                username,
                password,
                firstName,
                lastName,
            }),
        });

        if (file) {
            const fileFormData = new FormData();
            fileFormData.append('file', file);

            const uploadResp = await fetch('api/user/profilePic', {
                method: 'PATCH',
                body: fileFormData,
            });
        }

        if (resp.status == 200) {
            router.push('/');
        }
    };

    if (isAuthenticated) {
        router.push('/');
        return;
    }

    if (loading) {
        return <></>;
    }

    return (
        <>
            <Header loggedIn={isAuthenticated} />
            <MainContainer>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                    <label>Profile Pic</label>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Sign Up</button>
                </form>
            </MainContainer>
        </>
    );
};

export default Register;
