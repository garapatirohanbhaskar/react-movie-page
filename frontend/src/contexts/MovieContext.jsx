// src/contexts/MovieContext.jsx

import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on first mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Keep localStorage in sync whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to favorites if it's not already added
  const addToFavorite = (movie) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((m) => m.imdbID === movie.imdbID);
      return isAlreadyFavorite ? prev : [...prev, movie];
    });
  };

  // Remove movie from favorites by imdbID
  const removeFromFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== movieId));
  };

  return (
    <MovieContext.Provider value={{ favorites, addToFavorite, removeFromFavorite }}>
      {children}
    </MovieContext.Provider>
  );
}
