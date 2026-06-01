import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "./useAuth";
import { useNotification } from "./useNotification";

function calcularTotal(itens) {
  return itens.reduce((acc, item) => {
    const preco = Number(item.cardapio?.preco ?? item.preco ?? item.precoUnitario ?? 0);
    const quantidade = Number(item.quantidade ?? 0);
    return acc + preco * quantidade;
  }, 0);
}

function calcularTotalItens(itens) {
  return itens.reduce((acc, item) => acc + Number(item.quantidade ?? 0), 0);
}

function getMensagemErro(error, fallback) {
  if (typeof error.response?.data === "string") {
    return error.response.data;
  }

  return error.response?.data?.mensagem || fallback;
}

export function useCheckout() {
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const { notification, showNotification, clearNotification } = useNotification();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [formaPagamento, setFormaPagamento] = useState(2);
  const [finalizando, setFinalizando] = useState(false);

  const total = useMemo(() => calcularTotal(cartItems), [cartItems]);
  const totalItens = useMemo(() => calcularTotalItens(cartItems), [cartItems]);

  const carregarCarrinho = useCallback(async () => {
    const session = requireAuth();

    if (!session) {
      return;
    }

    try {
      setLoading(true);
      setErro("");

      const response = await api.get(`api/pedidos/carrinho/${session.usuarioId}`);
      const itens = response.data?.itens || response.data?.Itens || [];
      setCartItems(itens);
    } catch (error) {
      if (error.response?.status === 404) {
        setCartItems([]);
      } else {
        setErro("Nao foi possivel carregar os itens do checkout.");
      }
    } finally {
      setLoading(false);
    }
  }, [requireAuth]);

  const finalizarCheckout = useCallback(async () => {
    const session = requireAuth();

    if (!session) {
      return;
    }

    if (cartItems.length === 0 || finalizando) {
      return;
    }

    try {
      setFinalizando(true);
      setErro("");

      const finalizacao = await api.post(`api/pedidos/carrinho/${session.usuarioId}/finalizar`);
      const pedidoId = finalizacao.data?.pedidoId ?? finalizacao.data?.PedidoId;

      if (!pedidoId) {
        throw new Error("Pedido finalizado sem identificador de pedido.");
      }

      await api.post("api/pagamentos", {
        pedidoId,
        forma: formaPagamento,
      });

      showNotification("Pagamento confirmado! Seu pedido foi para preparo.", "success");
      window.dispatchEvent(new Event("cartUpdated"));
      setTimeout(() => navigate("/pedidos"), 1000);
    } catch (error) {
      showNotification(
        getMensagemErro(error, "Nao foi possivel concluir o pagamento."),
        "error"
      );
    } finally {
      setFinalizando(false);
    }
  }, [cartItems.length, finalizando, formaPagamento, navigate, requireAuth, showNotification]);

  useEffect(() => {
    queueMicrotask(() => carregarCarrinho());
  }, [carregarCarrinho]);

  return {
    cartItems,
    loading,
    erro,
    formaPagamento,
    setFormaPagamento,
    finalizando,
    notification,
    clearNotification,
    total,
    totalItens,
    finalizarCheckout,
  };
}
