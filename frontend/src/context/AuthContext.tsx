import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
} from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export type User = {
  _id: string;
  email: string;
  role: "free" | "premium" | "admin";
  summaries: string[];
  __v: number;
  usageCount?: number;
};

type AuthContextType = {
  token: string;
  user: User | null;
  logout: () => void;
  setAuthToken: (token: string) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getUserData: (authToken: string) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const getAuthState = async () => {
    try {
      const data = await getUserData(token);
      if (data) {
        setUser(data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error", error);
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
    } catch (error) {}
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
