import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthRoutes from "./Protected Route/AuthRoutes.jsx";
import ProtectedRoutes from "./Protected Route/ProtectedRoutes.jsx";
import "@mantine/core/styles.css";
import Dashbored from "./pages/Dashbored.jsx";
import Users from "./Components/Users.jsx";

const App = () => {
  return (
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthRoutes />}>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/" element={<Login />}></Route>
            </Route>

            <Route
              element={
                <ProtectedRoutes
                  allowedRoles={["USER", "ADMIN", "SUPER_ADMIN"]}
                />
              }
            >
              <Route path="/dashboard" element={<Dashbored />}></Route>
            </Route>

            <Route
              element={
                <ProtectedRoutes allowedRoles={["ADMIN", "SUPER_ADMIN"]} />
              }
            >
              <Route path="/admin">
                <Route path="users-data" element={<Users />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  );
};

export default App;
