import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../../api/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // Для навігації та очищення пошуку
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]); // Якщо немає query, очищуємо список фільмів
      return;
    }

    const fetchMovies = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error('Error searching movies:', error.message);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const queryValue = form.elements.search.value.trim();

    if (!queryValue) {
      setMovies([]); // Очищення списку фільмів при пустому запиті
      setSearchParams({}); // Видалення параметра query
      return;
    }

    setSearchParams({ query: queryValue }); // Встановлюємо параметр query у URL
  };

  const clearSearch = () => {
    setSearchParams({}); // Очищуємо параметри URL
    setMovies([]); // Очищуємо список фільмів
    navigate('/movies', { replace: true }); // Перенаправляємо на чисту сторінку /movies
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSearch}
        className={styles.searchForm}
        onReset={clearSearch} // Додаємо onReset для очищення
      >
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
        <button type="reset" className={styles.resetButton}>
          Clear
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
