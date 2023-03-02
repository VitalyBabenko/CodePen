import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { PenPage } from "./pages/PenPage/PenPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pen" element={<PenPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
