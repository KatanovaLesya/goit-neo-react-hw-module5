import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from '../../api/api';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation(); // Отримуємо поточний шлях

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch((error) => console.error('Error fetching trending movies:', error.message));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.listItem}>
            {/* Передаємо `state` з поточним шляхом */}
            <Link to={`/movies/${movie.id}`} state={{ from: location.pathname }} className={styles.link}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
