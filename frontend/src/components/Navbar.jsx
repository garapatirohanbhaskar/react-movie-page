import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import "../css/Navbar.css";

function NavBar() {
  const { favorites } = useContext(MovieContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">
          Favorites
          {favorites.length > 0 && (
            <span className="favorites-badge">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
