import { useState, useEffect } from "react";
import { useContext } from "react";
import Moviecard from "../components/Moviecard";
import "../css/Home.css";
import { searchMovies } from "../services/api";
import { MovieContext } from "../contexts/MovieContext";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addToFavorite, removeFromFavorite, favorites } = useContext(MovieContext);

  const fetchMovies = async (query) => {
    try {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const results = await searchMovies(searchQuery);

      if (results.length > 0) {
        setMovies(results);
        setError(null);
      } else {
        setMovies([]);
        setError(`No movies found for "${searchQuery}"`);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDefaultMarvelMovies = async () => {
      try {
        setLoading(true);

        const queries = [
          "Avengers",
          "Venom",
          "Titanic",
          "Joker",
          "ba",
          "Harry Potter",
          "Avatar",
          "The Dark Knight",
          "Pirates of the Caribbean",
        ];

        const allResults = await Promise.all(queries.map((q) => searchMovies(q)));

        const mergedResults = allResults
          .flat()
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID)
          );

        setMovies(mergedResults);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch Marvel movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMarvelMovies();
  }, []);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          placeholder="Search for movies..."
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => {
          const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

          return (
            <Moviecard
              movie={movie}
              key={movie.imdbID}
              isFavorite={isFavorite}
              onFavoriteToggle={() =>
                isFavorite
                  ? removeFromFavorite(movie.imdbID)
                  : addToFavorite(movie)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
