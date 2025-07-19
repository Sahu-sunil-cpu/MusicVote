'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  

  const handleVerify = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${BASE_URL}/api/users/verifyemail`, {
        token
      });

    
      console.log(res)

      if (res.data.success) {
        router.push('/signin');
      } else if(res.data.message){
        setError(res.data.message);
      }else if(res.data.error) {
        setError(res.data.error)
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Email Verification</h1>
        <p className="mb-6 text-center text-gray-400">
          Click the button below to verify your email and access your dashboard.
        </p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full px-4 py-2 rounded-xl font-semibold transition duration-200 ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </div>
    </div>
  );
}
