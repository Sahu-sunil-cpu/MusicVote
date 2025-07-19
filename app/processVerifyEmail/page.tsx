'use client';

import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../config';
import { useRouter } from 'next/navigation';
import path from 'path';

export default function EmailSentPage() {
    const [checking, setChecking] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();


    const handleRefresh = async () => {
        setChecking(true);
        setMessage('');

        try {
            const data = localStorage.getItem('email');
            if (!data) {
             setMessage("email not found");
             return;
             }

            const parsedData = JSON.parse(data);
            const email = parsedData.email;


            const res = await axios.post(`${BASE_URL}/api/users/emailVerifyStatus`, {
                email
            });


            if (res.data.success) {
                router.push("/signin")
            } else {
                setMessage('Email not verified yet. Please check again.');
            }
        } catch (err) {
            setMessage('An error occurred. Try again.');
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">📩 Email Sent</h1>
                <p className="text-gray-400 mb-6">
                    We've sent a verification email to your registered address.<br />
                    Please check your inbox and verify your email.
                </p>

                <p className="text-sm text-gray-500 mb-6">
                    After verifying, click the button below to refresh and continue.
                </p>

                {message && <p className="text-red-500 mb-4 text-sm">{message}</p>}

                <button
                    onClick={handleRefresh}
                    disabled={checking}
                    className={`w-full px-4 py-2 rounded-xl font-semibold transition ${checking
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {checking ? 'Checking...' : 'Refresh & Continue'}
                </button>
            </div>
        </div>
    );
}
