import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/protected" element={<h1>Welcome to ToDoList!</h1>} />

      <Route path="*" element={<h1 className="text-center mt-10">404 Pagina non trovata</h1>} />
    </Routes>
  );
}

export default App;
