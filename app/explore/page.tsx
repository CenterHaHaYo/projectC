'use client';

import { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export default function ExploreMovies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

const searchMovies = async () => {
    if (!query) {
      console.log('No query provided');
      return;
    }
    // แสดงข้อความใน Console เพื่อ Debug ค่าที่จะค้นหา
    console.log(`Searching for: ${query}`);
    console.log(`Endpoint: /api/tmdb?query=${query}`);

    const res = await fetch(`/api/tmdb?query=${query}`);
    // ตรวจสอบว่า Endpoint ส่งค่าตอบกลับที่ถูกต้องหรือไม่
    if (!res.ok) {
    console.error('Failed to fetch movies:', res.status);
    return;
  }
    // แปลงค่าที่ได้จาก Response เป็น JSON
    const data = await res.json();
    //const data: Movie[] = await res.json();
     // ตรวจสอบว่า JSON ที่ได้รับมีข้อมูลหรือไม่
    console.log('Fetched movies:', data);

    // ตรวจสอบโครงสร้าง JSON
    console.log('Fetched movies:', data);
    setMovies(data);
  };


 /* const searchMovies = async () => {
    if (!query) return;
    const res = await fetch(`/api/tmdb?query=${query}`);
    if (!res.ok) {
      console.error('Failed to fetch movies:', res.status);
      return;
    }
    const data = await res.json();
    console.log(`Searching for: ${query}`);
    console.log(`Endpoint: /api/tmdb?query=${query}`);

    setMovies(data);
  };*/
  
  

 /* const searchMovies = async () => {
    if (!query) return;
    const res = await fetch(`/api/tmdb?query=${query}`);
    const data: Movie[] = await res.json();
    setMovies(data);
  };*/

  const addToCollection = async (movie: Movie) => {
    const { title, release_date, poster_path } = movie;
    const year = new Date(release_date).getFullYear();
    const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;

    await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, year, poster, userId: 'current_user_id' }),
    });

    alert(`${title} added to your collection!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Explore Movies</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 border rounded-md w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchMovies}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {Array.isArray(movies) && movies.map((movie) => (
          <div
            key={movie.id}
            className="p-4 bg-white rounded shadow-md flex flex-col items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-2 text-xl font-bold">{movie.title}</h2>
            <p>{new Date(movie.release_date).getFullYear()}</p>
            <button
              onClick={() => addToCollection(movie)}
              className="mt-2 p-2 bg-green-500 text-white rounded-md"
            >
              Add to Collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



//const data: Movie[] = await res.json(); // บอก TypeScript ว่า data เป็น Array ของ Movie

//body: JSON.stringify({ title, year, poster, userId: 'current_user_id' }), // แทน 'current_user_id' ด้วย ID จริงจาก session


/*movies.map((movie) => (
          <div
            key={movie.id}
            className="p-4 bg-white rounded shadow-md flex flex-col items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-2 text-xl font-bold">{movie.title}</h2>
            <p>{new Date(movie.release_date).getFullYear()}</p>
            <button
              onClick={() => addToCollection(movie)}
              className="mt-2 p-2 bg-green-500 text-white rounded-md"
            >
              Add to Collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );*/