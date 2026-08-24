import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  login as loginRequest,
  logout as logoutRequest,
  refresh as refreshRequest,
} from "../api/auth.api";

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../utils/tokenStore";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [accessToken, setAccessTokenState] = useState(null);

  const storeAccessToken = (token) => {
    setAccessToken(token);
    setAccessTokenState(token);
  };
  const login = useCallback(async (credentials) => {
    const data = await loginRequest(credentials);

    setAccessToken(data.accessToken);

    setUser(data.user);

    return data;
  }, []);

  const refresh = useCallback(async () => {
    const data = await refreshRequest();

    storeAccessToken(data.accessToken);

    setUser(data.user);

    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      clearAccessToken();
      setAccessTokenState(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refresh();
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [refresh]);

  const value = useMemo(
    () => ({
      user,
      loading,
      accessToken: getAccessToken(),
      isAuthenticated: Boolean(getAccessToken()),
      login,
      refresh,
      logout,
    }),
    [user, loading, login, refresh, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
