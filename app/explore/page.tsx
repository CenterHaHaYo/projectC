"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export default function ExploreMovies() {
  //const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  

const searchMovies = async () => {
    if (!query) {
      console.log('No query provided');
      return;
    }
    // แสดงข้อความใน Console เพื่อ Debug ค่าที่จะค้นหา
    console.log(`Searching for: ${query}`);
    console.log(`Endpoint: /api/tmdb?query=${query}`);

    /*try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };*/

  
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 p-8">
      <Navbar /> 
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
          Explore Movies
        </h1>
        <div className="flex justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for movies..."
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchMovies}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(movies) &&
            movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {movie.title}
                  </h2>
                  <p className="text-gray-600">
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                  <button
                    onClick={() => addToCollection(movie)}
                    className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Add to Collection
                  </button>
                </div>
              </div>
            ))}
        </div>

        {Array.isArray(movies) && movies.length === 0 && (
          <div className="text-center text-gray-600 mt-12">
            <p>No movies found. Try searching for something else!</p>
          </div>
        )}
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