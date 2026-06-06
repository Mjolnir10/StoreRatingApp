import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import OwnerDashboard from "./pages/storeOwner/Dashboard";
import UserStores from "./pages/user/Stores";

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<div>Forgot Password Page</div>}
        />

        <Route path="/terms" element={<div>Terms Page</div>} />

        <Route path="/privacy" element={<div>Privacy Policy Page</div>} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRole="store_owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stores"
          element={
            <ProtectedRoute allowedRole="user">
              <UserStores />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
