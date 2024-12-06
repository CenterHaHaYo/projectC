"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    //setMessage('');
    setError('');
    setLoading(true);
    //setSuccess('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        //setMessage('User registered successfully! ');
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => router.push('/login'), 2000); // Redirect to login
      } else {
        const { error } = await res.json();
         //setMessage(error || 'Registration failed');
        setError(error || 'Registration failed');
      }
    } catch (err) {
      setError('Error. Please try again later.');
    }
  };

  /*const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  setLoading(false);

  if (res.ok) {
    router.push('/login'); // ย้ายไปหน้า Login หลังจากลงทะเบียนสำเร็จ
  } else {
    const { error } = await res.json();
    setError(error || 'Registration failed');
  }
};*/

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mt-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full p-2 mt-4 text-white rounded-md ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
            }`}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}


