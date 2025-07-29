import { createContext, useEffect, useReducer } from "react";
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
  const [auth, dispatch] = useReducer(reducer, {
    user: null,
    isLoggedIn: false,
  });

  const getUserData = async () => {
    try {
      const response = await getUser();
      dispatch({ type: "SET_USER", payload: response.data.user });
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserData();
    }
  }, [auth?.isLoggedIn]);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
