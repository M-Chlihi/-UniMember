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

import { clearAccessToken, setAccessToken } from "../utils/tokenStore";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [accessToken, setAccessTokenState] = useState(null);

  const storeSession = useCallback((data) => {
    setAccessToken(data.accessToken);

    setAccessTokenState(data.accessToken);

    setUser(data.user);
  }, []);

  const clearSession = useCallback(() => {
    clearAccessToken();
    setAccessTokenState(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const data = await loginRequest(credentials);

      storeSession(data);

      return data;
    },
    [storeSession],
  );

  const refresh = useCallback(async () => {
    const data = await refreshRequest();

    storeSession(data);

    return data;
  }, [storeSession]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const data = await refreshRequest();

        if (mounted) {
          storeSession(data);
        }
      } catch {
        if (mounted) {
          clearSession();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [storeSession, clearSession]);

  const value = useMemo(
    () => ({
      user,
      loading,
      accessToken,
      isAuthenticated: Boolean(accessToken),
      login,
      refresh,
      logout,
    }),
    [user, loading, accessToken, login, refresh, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
