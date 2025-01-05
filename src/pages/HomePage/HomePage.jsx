import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from '../../api/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation(); // Отримуємо поточний шлях

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch((error) => console.error('Error fetching trending movies:', error.message));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {/* Передаємо `state` з поточним шляхом */}
            <Link to={`/movies/${movie.id}`} state={{ from: location.pathname }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
