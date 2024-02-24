import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { AuthLayout } from "./layouts";
import axios from "axios";


function App() {
  axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL;
  axios.defaults.withCredentials = true;

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
