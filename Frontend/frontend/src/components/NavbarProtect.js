// components/NavbarPrivate.jsx
import { Link, useNavigate } from "react-router-dom";

export default function NavbarPrivate() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between bg-green-600 text-white p-4">
      <h1 className="font-bold text-xl">CollegeDocs</h1>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/explore">Explore</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
