import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../api';
import PropTypes from 'prop-types';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

// Перевірка типів пропсів
MovieCast.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MovieCast;
