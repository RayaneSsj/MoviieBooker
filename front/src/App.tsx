import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import UserReservations from "./pages/UserReservations";
import Login from "./pages/Login";
import "./global.css";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservations" element={<UserReservations />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes> 
  );
}

export default App;
