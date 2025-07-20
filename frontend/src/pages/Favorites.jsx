import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import Moviecard from "../components/Moviecard";

function Favorites() {
  const { favorites, removeFromFavorite } = useContext(MovieContext);

  return (
    <div className="favorites-page">
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies yet!</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <Moviecard
              key={movie.imdbID}
              movie={movie}
              isFavorite={true}
              onFavoriteToggle={() => removeFromFavorite(movie.imdbID)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
