import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((error) => {
        console.error('Error fetching movie details:', error.message);
        navigate('/movies'); // Повернутися до списку фільмів у разі помилки
      });
  }, [movieId, navigate]);

  if (!movie) return <div>Loading movie details...</div>;

  const { title, overview, genres, poster_path, vote_average } = movie;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
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
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
