import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<Navigate to="/homepage" replace />} />
      
      <Route element={<RequireAuth />}>
        <Route path="/homepage" element={<h1>Welcome to ToDoList!</h1>} />
      </Route>

      <Route path="*" element={<h1 className="text-center mt-10">404 Pagina non trovata</h1>} />
    </Routes>
  );
}

export default App;
