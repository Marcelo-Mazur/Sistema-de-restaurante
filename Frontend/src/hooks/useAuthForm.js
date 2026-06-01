import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "./useAuth";
import { useNotification } from "./useNotification";

function getMensagemErro(error, fallback) {
  if (typeof error.response?.data === "string") {
    return error.response.data;
  }

  return error.response?.data?.mensagem || fallback;
}

export function useAuthForm() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const { notification: feedback, showNotification, clearNotification } = useNotification();
  const [submitting, setSubmitting] = useState(false);

  const autenticar = useCallback(
    async ({ endpoint, body, mensagemSucesso, mensagemErro }) => {
      clearNotification();

      if (submitting) {
        return;
      }

      try {
        setSubmitting(true);
        const response = await api.post(endpoint, body);
        const tokenDaApi = response.data.token;
        const idDoUsuario = response.data.id || response.data.usuarioId;

        setSession({ token: tokenDaApi, usuarioId: idDoUsuario });
        showNotification(mensagemSucesso, "success");
        setTimeout(() => navigate("/cardapio"), 700);
      } catch (error) {
        showNotification(getMensagemErro(error, mensagemErro), "error");
      } finally {
        setSubmitting(false);
      }
    },
    [clearNotification, navigate, setSession, showNotification, submitting]
  );

  const login = useCallback(
    async ({ email, senha }) => {
      await autenticar({
        endpoint: "api/auth/login",
        body: { email, senha },
        mensagemSucesso: "Login realizado com sucesso! Redirecionando...",
        mensagemErro: "Erro ao conectar com o servidor.",
      });
    },
    [autenticar]
  );

  const cadastrar = useCallback(
    async ({ nome, email, senha }) => {
      await autenticar({
        endpoint: "api/auth/cadastro",
        body: { nome, email, senha },
        mensagemSucesso: "Conta criada com sucesso! Redirecionando...",
        mensagemErro: "Nao foi possivel concluir seu cadastro.",
      });
    },
    [autenticar]
  );

  return {
    feedback,
    submitting,
    login,
    cadastrar,
    clearFeedback: clearNotification,
  };
}
