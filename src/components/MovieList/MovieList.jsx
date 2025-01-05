import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => (
  <ul className={styles.list}>
    {movies.map((movie) => (
      <li key={movie.id} className={styles.listItem}>
        <Link to={`/movies/${movie.id}`} className={styles.link}>{movie.title}</Link>
      </li>
    ))}
  </ul>
);

// Перевірка типів пропсів
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default MovieList;
