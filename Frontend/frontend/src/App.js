import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/protectedRoute";
import Download from "./pages/download"
import UploadDocument from "./pages/upload"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/download" element={<Download />} />
      <Route path="/upload" element={<UploadDocument />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
