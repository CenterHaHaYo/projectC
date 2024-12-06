"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  const handleLogin = async (): Promise<void> => {
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name,email, password }),
    });

    setLoading(false);

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);// เก็บ token ใน Local Storage
      localStorage.setItem('name', name);
      router.push('/collection');// ย้ายไปหน้า collection
    } else {
      const { error } = await res.json();
      setError(error || 'Login failed');// แสดงข้อความ error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style ={{
      backgroundImage: "url('https://i.pinimg.com/736x/97/06/72/970672048bd58523de8d582a105a60f9.jpg')",
    }}>
      <div className="w-full max-w-sm p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 mb-4  mt-2 border rounded-md ocus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full p-2 mt-4 text-white rounded-md ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
            
          </button>
          <button
            onClick={() => router.push('/register')}
            className="w-full py-2 mt-4 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
          >
            Don't have an account? Let's register 
          </button>
        </div>
      </div>
    </div>
  );
}
