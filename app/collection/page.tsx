'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function MyCollection() {
  interface Movie {
    id: string;
    title: string;
    poster: string;
    year: number;
  }
  const [name, setName] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    const userName = localStorage.getItem('name');
    setName(userName || 'User');

    const fetchMovies = async () => {
      const res = await fetch('/api/movies');
      //const data: Movie[] = await res.json();
      if (res.ok) {
      const data = await res.json();
      setMovies(data);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Welcome, {name}!</h1>
      <h2 className="text-3xl font-bold">My Movie Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="p-4 bg-white rounded shadow-md flex flex-col items-center"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-2 text-xl font-bold">{movie.title}</h2>
            <p>{movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
