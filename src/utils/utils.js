import { jwtDecode } from "jwt-decode";

export const validateToken = () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const decodedToken = jwtDecode(token);
    
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
