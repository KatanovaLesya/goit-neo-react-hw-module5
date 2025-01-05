import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams(); // ID фільму
  const [movie, setMovie] = useState(null); // Стан для деталей фільму
  const navigate = useNavigate(); // Для навігації
  const location = useLocation(); // Для отримання попереднього місця

  // Шлях для повернення
  const backLink = location.state?.from || '/movies'; // Якщо `state.from` немає, переходимо на `/movies`.

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((error) => {
        console.error('Error fetching movie details:', error.message);
        navigate('/movies'); // Якщо помилка, перенаправляємо на пошук
      });
  }, [movieId, navigate]);

  if (!movie) return <div>Loading movie details...</div>;

  const { title, overview, genres, poster_path, vote_average } = movie;

  return (
    <div>
      {/* Кнопка повернення */}
      <button onClick={() => navigate(backLink)}>Go back</button>

      <h1>{title} ({vote_average}/10)</h1>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
      <p>{overview}</p>
      <h3>Genres:</h3>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <h3>Additional information:</h3>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLink }}>Cast</Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
        </li>
      </ul>

      {/* Дочірні маршрути */}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
