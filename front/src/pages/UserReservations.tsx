import { useEffect, useState } from "react";
import axios from "axios";

const UserReservations = () => {
  const userId = localStorage.getItem("userId");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/reservations?userId=${userId}`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des réservations :", error);
      });
  }, []);

  const cancelReservation = async (reservationId) => {
    try {
      const userId = localStorage.getItem("userId"); // Récupérer l'ID utilisateur
      if (!userId) {
        alert("Erreur : utilisateur non connecté !");
        return;
      }
  
      await axios.delete(`http://localhost:3000/reservations/${reservationId}?userId=${userId}`);
  
      alert("Réservation annulée !");
      
      // Mettre à jour la liste des réservations en supprimant celle annulée
      setReservations(reservations.filter(res => res.id !== reservationId));
    } catch (error) {
      console.error("Erreur lors de l'annulation :", error);
      alert("Impossible d'annuler la réservation !");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mes Réservations</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "20px" }}>
          {reservations.map((res) => (
            <div key={res.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
              <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.movieTitle} style={{ width: "100%" }} />
              <h3>{res.movieTitle}</h3>
              <p>📅 {new Date(res.startTime).toLocaleString()}</p>
              <button style={{ background: "red", color: "white", padding: "10px", fontSize: "14px", cursor: "pointer" }}
                onClick={() => {
                  console.log("ID de la réservation :", reservation.id);
                  cancelReservation(reservation.id);
                }}>
                Annuler
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReservations;
