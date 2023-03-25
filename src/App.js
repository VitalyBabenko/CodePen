import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PenPage } from './pages/PenPage/PenPage';
import { YourWorksPage } from './pages/YourWorksPage/YourWorksPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';

//  TODO:
//  1. icons
//  2. console
//  3. search
//  4. sort
//  5. deleted
//  6. aliases
//  7. extraKeys for Editor
//  8. dropFile

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pen" element={<PenPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/your-works" element={<YourWorksPage />} />
      <Route path="/your-works/:id" element={<PenPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
