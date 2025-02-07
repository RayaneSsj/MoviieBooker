import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Bienvenue sur MoviieBooker</h1>
      <p>Réservez vos films préférés en toute simplicité.</p>
      <button 
        style={{
          background: "blue", 
          color: "white", 
          padding: "15px 30px", 
          fontSize: "18px", 
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
          borderRadius: "5px"
        }}
        onClick={() => navigate("/login")}
      >
        Se connecter
      </button>
    </div>
  );
};

export default HomePage;
