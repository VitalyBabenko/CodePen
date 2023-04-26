import { Routes, Route } from 'react-router-dom';
import { routes } from './routes/nav.data';
import { PrivateRoute } from './layouts/PrivateRoute';

function App() {
  return (
    <Routes>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PrivateRoute isPrivate={route.isAuth}>
              <route.element />
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
