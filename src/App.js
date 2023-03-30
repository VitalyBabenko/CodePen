import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PenPage } from './pages/PenPage/PenPage';
import { YourWorksPage } from './pages/YourWorksPage/YourWorksPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { PrivateRoute } from './layouts/PrivateRoute';

//  TODO:
//  1. icons

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pen" element={<PenPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* <>
        <PrivateRoute />
      </> */}

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/your-works"
        element={
          <PrivateRoute>
            <YourWorksPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/your-works/:id"
        element={
          <PrivateRoute>
            <PenPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
