import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const url = isRegister
      ? "https://moviiebooker-sy47.onrender.com/auth/register"
      : "https://moviiebooker-sy47.onrender.com/auth/login";
  
    try {
      const response = await axios.post(url, { email, password });
  
      console.log("Réponse API:", response.data);
  
      if (!isRegister) {
        console.log("on entre dans la boucle !");
        if (response.data && response.data.access_token) {
          const token = response.data.access_token;
          console.log("Token reçu :", token);
  
          try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            console.log("Decoded token :", decodedToken);
  
            const userId = decodedToken.userId;
  
            if (userId) {
              localStorage.setItem("token", token);
              localStorage.setItem("userId", userId);
              console.log("UserID stocké :", userId);
  
              window.location.href = "/movies";
            } else {
              console.error("Erreur : ID utilisateur absent dans le token", decodedToken);
              alert("Erreur : ID utilisateur manquant !");
            }
          } catch (err) {
            console.error("Erreur lors du décodage du token :", err);
            alert("Erreur : Impossible de traiter le token !");
          }
        } else {
          console.error("Réponse API invalide :", response.data);
          alert("Erreur : ID utilisateur ou token manquant !");
        }
      } else {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setIsRegister(false);
        setEmail("");
        setPassword("");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erreur d'authentification :", error);
      console.log("Détails de l'erreur :", error.response?.data);
      alert(error.response?.data?.message || "Échec de l'authentification !");
    }
    
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 shadow-lg rounded-lg bg-white w-96">
        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 p-2 rounded-l-lg ${!isRegister ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setIsRegister(false)}
          >
            Se connecter
          </button>
          <button
            className={`w-1/2 p-2 rounded-r-lg ${isRegister ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setIsRegister(true)}
          >
            S'inscrire
          </button>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {isRegister ? "S'inscrire" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
