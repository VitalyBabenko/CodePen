import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import { ErrorPage } from "./components/pages/ErrorPage/ErrorPage";
import { HomePage } from "./components/pages/HomePage/HomePage";
import { PenPage } from "./components/pages/PenPage/PenPage";
import { SignUpPage } from "./components/pages/SignUpPage/SignUpPage";
import { YourWorks } from "./components/pages/YourWorksPage/YourWorksPage";
import { SandboxPage } from "./components/pages/SandboxPage/SandboxPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sandbox" element={<SandboxPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/your-works" element={<YourWorks />} />
      <Route path="/your-works/:id" element={<PenPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
