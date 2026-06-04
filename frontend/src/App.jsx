import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
