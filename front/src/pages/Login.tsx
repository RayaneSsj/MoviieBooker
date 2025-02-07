import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isRegister
      ? "http://localhost:3000/auth/register"
      : "http://localhost:3000/auth/login";

    try {
      const response = await axios.post(url, { email, password });
      console.log("Réponse API:", response.data);

      if (!isRegister) {
        console.log("on entre dans la boucle !");
        if (response.data) {
          console.log("On entre dans la deuxieme boucle !");
          const token = response.data.access_token;
          console.log("Token :", token)
          if (token) {
            console.log("On entre dans la derniere boucle !")
            localStorage.setItem("token", token);
          
            // Décoder le token pour extraire userId
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décodage du JWT
            console.log("Decoded token : ", decodedToken);
            const userId = decodedToken.userId;
            console.log("UserId :", userId);
          
            if (userId) {
              localStorage.setItem("userId", userId);
              console.log("UserID stocké :", userId);
              window.location.href = "/movies";
            } else {
              console.error("Impossible de récupérer userId depuis le token :", decodedToken);
              alert("Erreur : ID utilisateur manquant !");
            }
          } else {
            alert("Erreur : Token manquant !");
          }

          window.location.href = "/movies";
        } else {
          alert("Erreur : ID utilisateur ou token manquant !");
        }
      } else {
        alert("Inscription réussie, vous pouvez vous connecter !");
        setIsRegister(false);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      alert("Échec de l'authentification !");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 shadow-lg rounded-lg bg-white w-96">
        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 p-2 rounded-l-lg ${
              !isRegister ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsRegister(false)}
          >
            Se connecter
          </button>
          <button
            className={`w-1/2 p-2 rounded-r-lg ${
              isRegister ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
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
