import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { useAuth } from "./hooks/useAuth";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Teachers from "./pages/Teachers/Teachers";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/teachers" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="teachers" element={<Teachers />} />

        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
