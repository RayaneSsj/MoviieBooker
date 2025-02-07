import { useEffect, useState } from "react";
import axios from "axios";

interface Reservation {
  _id: string;
  movieId: string;
  movieTitle: string;
  poster_path?: string;
  startTime: string;
}


const UserReservations = () => {
  const userId = localStorage.getItem("userId");
  const [reservations, setReservations] = useState<Reservation[]>([]);


  useEffect(() => {
    axios.get(`https://moviiebooker-sy47.onrender.com/reservations?userId=${userId}`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des réservations :", error);
      });
  }, [userId]);

  const cancelReservation = async (reservationId: string) => {
  try {
    const userId = localStorage.getItem("userId"); // Récupérer l'ID utilisateur
    if (!userId) {
      alert("Erreur : utilisateur non connecté !");
      return;
    }

    await axios.delete(`https://moviiebooker-sy47.onrender.com/reservations/${reservationId}?userId=${userId}`);

    alert("Réservation annulée !");
    
    // Mettre à jour la liste des réservations en supprimant celle annulée
    setReservations(reservations.filter(res => res._id !== reservationId));
  } catch (error) {
    console.error("Erreur lors de l'annulation :", error);
    alert("Impossible d'annuler la réservation !");
  }
};
console.log("Réservations récupérées :", reservations);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mes Réservations</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "20px" }}>
          {reservations.map((res) => (
            <div key={res._id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
              <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.movieTitle} style={{ width: "100%" }} />
              <h3>{res.movieTitle}</h3>
              <p>📅 {new Date(res.startTime).toLocaleString()}</p>
              <button style={{ background: "red", color: "white", padding: "10px", fontSize: "14px", cursor: "pointer" }}
                onClick={() => cancelReservation(res._id)}>
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
