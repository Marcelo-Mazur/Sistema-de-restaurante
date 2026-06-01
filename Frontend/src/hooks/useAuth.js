import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function getStoredSession() {
  const token = localStorage.getItem("tokenSessao");
  const usuarioId = localStorage.getItem("usuarioId");

  return { token, usuarioId };
}

export function useAuth() {
  const navigate = useNavigate();
  const [session, setSessionState] = useState(getStoredSession);

  const setSession = useCallback(({ token, usuarioId }) => {
    if (token) {
      localStorage.setItem("tokenSessao", token);
    }

    if (usuarioId) {
      localStorage.setItem("usuarioId", usuarioId);
    }

    setSessionState(getStoredSession());
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem("tokenSessao");
    localStorage.removeItem("usuarioId");
    setSessionState({ token: null, usuarioId: null });
  }, []);

  const requireAuth = useCallback(() => {
    const currentSession = getStoredSession();

    if (!currentSession.token || !currentSession.usuarioId) {
      navigate("/login");
      return null;
    }

    setSessionState(currentSession);
    return currentSession;
  }, [navigate]);

  const logout = useCallback(async () => {
    const currentSession = getStoredSession();

    if (currentSession.token) {
      try {
        await api.post("api/auth/logout", { token: currentSession.token });
      } catch (err) {
        console.error("Erro ao limpar sessao no backend:", err);
      }
    }

    clearSession();
    navigate("/login");
  }, [clearSession, navigate]);

  const isAuthenticated = useMemo(() => {
    return Boolean(session.token && session.usuarioId);
  }, [session.token, session.usuarioId]);

  return {
    token: session.token,
    usuarioId: session.usuarioId,
    isAuthenticated,
    setSession,
    clearSession,
    requireAuth,
    logout,
  };
}
