import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
} from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  token: string;
  user: object | null;
  logout: () => void;
  setAuthToken: (token: string) => void;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
  getUserData: (authToken: string) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState<object | null>(null);
  const navigate = useNavigate();

  const getAuthState = async () => {
    try {
      const data = await getUserData(token);
      console.log(data);
      if (data) {
        setIsLoggedIn(true);
        setUser(data);
        navigate("/");
        // getUserData();
      } else {
        console.log("WHYY");
        navigate("/login");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      navigate("/login");

      // toast.error(error.message);
    }
  };

  const getUserData = async (authToken: string) => {
    try {
      const { data } = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (data) {
        return data;
      } else {
        return null;
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const setAuthToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, logout, setAuthToken, setUser, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
