import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RequireAuth from "./components/RequireAuth";
import VisualizeTasks from "./pages/VisualizeTasks";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route element={<RequireAuth />}>
        <Route path="/homepage" element={<VisualizeTasks />} />
        <Route path="/add" element={<h1 className="text-center mt-10">Add Task (Coming Soon)</h1>} />
      </Route>

      <Route path="*" element={<h1 className="text-center mt-10">404 Page not found.</h1>} />
    </Routes>
  );
}

export default App;
