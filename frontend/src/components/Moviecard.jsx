import "../css/Moviecard.css";

function Moviecard({ movie, isFavorite, onFavoriteToggle }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
        />
        <div className="movie-overlay">
          <button
            className="favorite-btn"
            onClick={onFavoriteToggle}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? "💔" : "❤️"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default Moviecard;
