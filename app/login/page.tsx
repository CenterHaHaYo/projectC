'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      router.push('/collection');
    } else {
      const { error } = await res.json();
      setError(error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mt-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
