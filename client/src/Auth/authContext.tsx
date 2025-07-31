import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import type { Account, ContextType } from "../types/definitions";

type ChildrenType = {
  children: React.ReactNode;
};

const AuthContext = createContext<ContextType | null>(null);

export function AuthProvider({ children }: ChildrenType) {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const isConnected = account != null;

  const authenticate = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/me`, { withCredentials: true })
      .then((response) => setAccount(response.data))
      .catch(() => setAccount(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  const logout = useCallback(() => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {},
        { withCredentials: true },
      )
      .then(() => {
        setAccount(null);
        navigate("/");
      });
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ account, isConnected, isLoading, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authState = useContext(AuthContext);
  if (!authState) {
    throw new Error("there's an error with Authprovider");
  }
  return authState;
};
