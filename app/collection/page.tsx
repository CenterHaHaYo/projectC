'use client';

import { useEffect, useState } from 'react';

export default function MyCollection() {
  interface Movie {
    id: string;
    title: string;
    poster: string;
    year: number;
  }
  
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/movies');
      const data: Movie[] = await res.json();
      //const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">My Movie Collection</h1>
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
