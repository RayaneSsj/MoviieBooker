import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../MoviesList.css";

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
}

const MoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log("Fetching movies from API:", `https://moviiebooker-sy47.onrender.com/movies/now_playing?page=${page}`);
  
    axios.get(`https://moviiebooker-sy47.onrender.com/movies/now_playing?page=${page}`)
      .then(response => {
        console.log("Réponse API:", response.data);
        setMovies(response.data.results || []);
        setTotalPages(response.data.total_pages);
      })
      .catch(err => {
        console.error("Erreur API:", err);
      });
  }, [page]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      axios.get(`https://moviiebooker-sy47.onrender.com/movies/search?query=${searchTerm}`)
        .then(response => {
          setMovies(response.data.results || []);
        })
        .catch(err => {
          console.error("Erreur API:", err);
        });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Liste des Films</h1>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      {/* Bouton Mes Réservations */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <Link to="/reservations">
          <button className="reservation-btn">Mes Réservations</button>
        </Link>
      </div>

      {/* Affichage des films */}
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} 
                alt={movie.title} 
                className="movie-img"
              />
              <h3>{movie.title}</h3>
              <Link to={`/movies/${movie.id}`}>
                <button>Voir Détails</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Aucun film trouvé.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
          Précédent
        </button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))} disabled={page === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
