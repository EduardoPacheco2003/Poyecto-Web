import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ServicesPage from "./pages/ServicesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/header";
import DashBoard from "./pages/DashBoardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          {/* Protegidas si estas logeado: */}
          <Route element={<ProtectedRoute isAllowed={!auth} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          {/* Rutas Protegidas: */}
          <Route element={<ProtectedRoute isAllowed={auth} />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
