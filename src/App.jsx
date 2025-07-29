import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login";
import { MantineProvider } from "@mantine/core";
import Dashbored from "./pages/Dashbored.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthRoutes from "./Protected Route/AuthRoutes.jsx";
import UsersData from "./pages/UsersData.jsx";
import ProtectedRoutes from "./Protected Route/ProtectedRoutes.jsx";

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
              <Route path="/users-data" element={<UsersData />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  );
};

export default App;
