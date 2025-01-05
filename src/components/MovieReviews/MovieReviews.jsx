import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api';
import PropTypes from 'prop-types'; 

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews).catch(console.error);
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

// Перевірка типів пропсів
MovieReviews.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MovieReviews;
