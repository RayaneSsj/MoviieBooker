import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">Accueil</Link>
      <div>
        <Link to="/reservations" className="px-4">📅 Mes Réservations</Link>
      </div>
    </nav>
  );
};

export default Navbar;
