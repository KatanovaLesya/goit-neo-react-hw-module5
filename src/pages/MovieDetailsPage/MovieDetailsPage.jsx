import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const backLink = location.state?.from || '/movies'; 

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((error) => {
        console.error('Error fetching movie details:', error.message);
        navigate('/movies'); 
      });
  }, [movieId, navigate]);

  if (!movie) return <div className={styles.loading}>Loading movie details...</div>;

  const { title, overview, genres, poster_path, vote_average } = movie;

  return (
    <div className={styles.container}>
      <button
  onClick={() => {
    if (backLink === '/movies') {
      navigate('/movies', { replace: true }); // Очистка `query` при поверненні на MoviesPage
    } else {
      navigate(backLink); // Звичайне повернення
    }
  }}
  className={styles.goBack}
>
  Go back
</button>

      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>
            {title} <span className={styles.rating}>({vote_average}/10)</span>
          </h1>
          <p className={styles.overview}>{overview}</p>
          <h3 className={styles.genresTitle}>Genres:</h3>
          <ul className={styles.genresList}>
            {genres.map((genre) => (
              <li key={genre.id} className={styles.genreItem}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional information:</h3>
        <ul className={styles.linksList}>
          <li>
            <Link to="cast" state={{ from: backLink }} className={styles.link}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }} className={styles.link}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
