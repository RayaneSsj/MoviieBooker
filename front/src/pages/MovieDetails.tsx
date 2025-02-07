import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reservationDate, setReservationDate] = useState("");
  const userId = "67a1fc92373b00ef8d80d8c6";

  useEffect(() => {
    console.log("ID du film :", id);

    if (!id) return;

    axios.get(`http://localhost:3000/movies/${id}`)
      .then((response) => {
        console.log("Détails du film :", response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du film :", error);
      });
  }, [id]);

  const handleReservation = async () => {
    if (!movie || !reservationDate) {
      alert("Veuillez sélectionner une date et une heure !");
      return;
    }

    const reservationData = {
      userId: userId,
      movieId: id,
      movieTitle: movie.title,
      startTime: new Date(reservationDate).toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:3000/reservations", reservationData);
      console.log("Réservation réussie :", response.data);
      alert(`Réservation confirmée pour ${movie.title} le ${new Date(reservationDate).toLocaleString()} !`);
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Erreur lors de la réservation !");
    }
  };

  if (!movie) {
    return <p>Chargement...</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: "300px" }} />
      <p>{movie.overview}</p>

      {/* Sélecteur de date */}
      <label>Choisissez une date et une heure :</label>
      <input type="datetime-local" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} style={{ margin: "10px", padding: "5px" }} />

      <button 
        style={{ background: "green", color: "white", padding: "10px", fontSize: "16px", cursor: "pointer" }}
        onClick={handleReservation}
      >
        Réserver
      </button>
    </div>
  );
};

export default MovieDetails;
