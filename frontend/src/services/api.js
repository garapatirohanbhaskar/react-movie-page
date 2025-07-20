const API_KEY = "ac2a786c";
const BASE_URL = "https://www.omdbapi.com/";

// Search Movies by Title (Frontend Safe)
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search;  // Successful response with results
    } else {
      return [];  // No results or API returned error
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Get Movie Details by IMDb ID (Frontend Safe)
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return data;  // Successful response with movie details
    } else {
      throw new Error(data.Error || "Movie not found");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
