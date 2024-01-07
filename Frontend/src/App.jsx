import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ServicesPage from "./pages/ServicesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import AdminPage from "./pages/AdminPage";
import AdminAddService from "./pages/AdminAddService";
import AdminEditService from "./pages/AdminEditService";
import Footer from "./components/Footer";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

function App() {
  const { auth, user } = useContext(AuthContext);
  const { userRole } = user;
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/terminos" element={<TermsAndConditionsPage />} />

          {/* Protegidas si estas logeado: */}
          <Route element={<ProtectedRoute isAllowed={!auth} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          {/* Rutas Protegidas: */}
          <Route element={<ProtectedRoute isAllowed={auth} />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/carrito" element={<ShoppingCartPage />} />
          </Route>
          {/* Rutas Para Admin */}
          <Route
            element={
              <ProtectedRoute isAllowed={auth && userRole.includes("Admin")} />
            }>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add-service" element={<AdminAddService />} />
            <Route
              path="/admin/edit-service/:id"
              element={<AdminEditService />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
