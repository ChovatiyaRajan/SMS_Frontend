import { createContext, useEffect, useReducer, useState } from "react";
import { getUser } from "../api/api";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, user: null, isLoggedIn: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, dispatch] = useReducer(reducer, {
    user: null,
    isLoggedIn: false,
  });

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      dispatch({ type: "SET_USER", payload: response.data.user });
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [auth?.isLoggedIn]);

  return (
    <AuthContext.Provider value={{ auth, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
