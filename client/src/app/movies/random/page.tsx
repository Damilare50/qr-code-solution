'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Film, Star, Calendar, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

interface Movie {
  Title: string;
  Poster: string;
  Year: number;
  Genre: string;
  imdbRating: number;
}

export default function MoviesPage() {
  const router = useRouter();

  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Movie[]>(`/api/movies/random`);
        console.log('Fetched movies:', response.data);
        setMoviesData(() => response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-white text-lg'>Loading your movie collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='text-center'>
          <div className='bg-red-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
            <Film className='w-8 h-8 text-red-400' />
          </div>
          <h2 className='text-2xl font-bold text-white mb-2'>Oops!</h2>
          <p className='text-gray-300 mb-6'>{error}</p>
          <button
            onClick={() => router.push('/')}
            className='inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to QR Generator</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <button
            onClick={() => router.push('/')}
            className='inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-6'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to QR Generator</span>
          </button>

          <div className='flex items-center justify-center mb-4'>
            <div className='bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full shadow-lg'>
              <Film className='w-8 h-8 text-white' />
            </div>
          </div>

          <h1 className='text-4xl font-bold text-white mb-2'>
            Your Movie Collection
          </h1>
          <p className='text-gray-300'>Curated just for you...</p>
        </div>

        {/* Movies Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {moviesData?.map((movie, index) => (
            <div
              key={index}
              className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden hover:scale-105 hover:bg-white/15 transition-all duration-300 group'
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <div className='relative overflow-hidden h-48'>
                <Image
                  fill
                  src={movie.Poster}
                  alt={movie.Title}
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                />
                <div className='absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1'>
                  <Star className='w-3 h-3 text-yellow-400 fill-current' />
                  <span className='text-white text-xs font-semibold'>
                    {movie.imdbRating}
                  </span>
                </div>
              </div>

              <div className='p-4'>
                <h3 className='text-white font-bold text-lg mb-2 line-clamp-2'>
                  {movie.Title}
                </h3>

                <div className='flex items-center justify-between text-sm text-gray-300'>
                  <div className='flex items-center space-x-1'>
                    <Calendar className='w-4 h-4' />
                    <span>{movie.Year}</span>
                  </div>
                  <span className='bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs'>
                    {movie.Genre}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className='text-center mt-12 pb-8'>
          <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto'>
            <h3 className='text-white font-semibold mb-2'>Want more movies?</h3>
            <p className='text-gray-300 text-sm mb-4'>
              Generate a new QR code to discover different movies!
            </p>
            <button
              onClick={() => router.push('/')}
              className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105'
            >
              <Film className='w-4 h-4' />
              <span>Generate New QR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
