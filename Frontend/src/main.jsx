import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ShoppingProvider } from "./context/shoppingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ShoppingProvider>
        <App />
      </ShoppingProvider>
    </AuthProvider>
  </React.StrictMode>
);
