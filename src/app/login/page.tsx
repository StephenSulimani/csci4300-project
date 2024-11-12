// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import useAuth from '../hooks/useAuth';
// import { useEffect } from 'react';

// export default function LoginPage() {
//     const router = useRouter();
//     const { isAuthenticated, loading } = useAuth();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!email || !password) {
//             setError('Please fill in all fields');
//             return;
//         }
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         });

//         if (response.status == 200) {
//             router.push('/');
//         } else {
//             const data = await response.json();
//             setError(data.message);
//         }

//         // Here you would typically handle the login logic
//         // console.log('Login attempt with:', { email, password });
//         // setError('');
//         // Reset form fields after submission
//         setEmail('');
//         setPassword('');
//     };

//     useEffect(() => {
//         if (isAuthenticated && !loading) {
//             router.push('/');
//         }
//     }, [isAuthenticated, loading, router]);

//     if (loading || isAuthenticated) {
//         return <div></div>;
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-900">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
//                 <h1 className="text-2xl font-bold mb-6 text-center text-white">
//                     Login
//                 </h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="block text-sm font-medium text-gray-300"
//                         >
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400
//                 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white"
//                             placeholder="you@example.com"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="block text-sm font-medium text-gray-300"
//                         >
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400
//                 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white"
//                             placeholder="••••••••"
//                             required
//                         />
//                     </div>
//                     {error && <p className="text-red-400 text-sm">{error}</p>}
//                     <button
//                         type="submit"
//                         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                         Sign in
//                     </button>
//                 </form>
//                 <div className="mt-6 text-center">
//                     <a
//                         href="#"
//                         className="text-sm text-indigo-400 hover:text-indigo-300"
//                     >
//                         Forgot your password?
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }
// Login.tsx

'use client';

import React from 'react';
import MainContainer from '../components/MainContainer';
import { default as Header } from '../components/Header';

const Login: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //LoginInternal(); idk
        if (typeof window !== 'undefined') {
            localStorage.setItem('isLoggedIn', 'true');
        }
        window.location.href = '/';
    };

    return (
        <>
            <Header />
            <MainContainer>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </MainContainer>
        </>
    );
};

export default Login;
