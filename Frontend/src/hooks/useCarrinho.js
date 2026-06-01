import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "./useAuth";

function calcularTotal(itens) {
  return itens.reduce((acc, item) => {
    const preco = item.cardapio?.preco || item.preco || item.precoUnitario || 0;
    return acc + preco * item.quantidade;
  }, 0);
}

export function useCarrinho(showNotification, options = {}) {
  const { requireAuth } = useAuth();
  const { carregarAoIniciar = true } = options;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(carregarAoIniciar);
  const [total, setTotal] = useState(0);
  const [erro, setErro] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const resetSuccess = useCallback(() => {
    setSuccessAnimation(false);
  }, []);

  const carregarCarrinho = useCallback(async (primeiroCarregamento = false) => {
    const session = requireAuth();

    if (!session) {
      return;
    }

    try {
      if (primeiroCarregamento) setLoading(true);
      setErro(null);

      const response = await api.get(`api/pedidos/carrinho/${session.usuarioId}`);
      const itens = response.data.itens || response.data.Itens || [];

      setCartItems(itens);
      setTotal(calcularTotal(itens));
    } catch {
      setErro("Nao foi possivel carregar os itens do carrinho.");
    } finally {
      if (primeiroCarregamento) setLoading(false);
    }
  }, [requireAuth]);

  const addToCart = useCallback(
    async (item, quantity = 1, onSuccess) => {
      const session = requireAuth();

      if (!session) {
        return;
      }

      try {
        setAddingToCart(true);

        await api.post(`api/pedidos/carrinho/${session.usuarioId}`, {
          cardapioId: item.id,
          quantidade: quantity,
        });

        setSuccessAnimation(true);
        showNotification?.(`${item.nome} adicionado ao carrinho!`, "success");

        setTimeout(() => {
          setSuccessAnimation(false);
          window.dispatchEvent(new Event("cartUpdated"));
          onSuccess?.();
        }, 1200);
      } catch {
        showNotification?.(
          "Nao foi possivel adicionar o item. Tente novamente.",
          "error"
        );
      } finally {
        setAddingToCart(false);
      }
    },
    [requireAuth, showNotification]
  );

  const removerItem = useCallback(async (itemId) => {
    try {
      setErro(null);
      await api.delete(`api/pedidos/carrinho/item/${itemId}`);
      carregarCarrinho();
    } catch {
      setErro("Nao foi possivel remover o item.");
    }
  }, [carregarCarrinho]);

  const atualizarQuantidade = useCallback(async (itemId, quantidadeAtual, mudanca) => {
    const novaQuantidade = quantidadeAtual + mudanca;

    if (novaQuantidade <= 0) {
      removerItem(itemId);
      return;
    }

    try {
      setErro(null);
      await api.put(`api/pedidos/carrinho/item/${itemId}`, novaQuantidade, {
        headers: { "Content-Type": "application/json" },
      });
      carregarCarrinho();
    } catch {
      setErro("Nao foi possivel atualizar a quantidade do item.");
    }
  }, [carregarCarrinho, removerItem]);

  useEffect(() => {
    if (!carregarAoIniciar) {
      return;
    }

    queueMicrotask(() => carregarCarrinho(true));
  }, [carregarAoIniciar, carregarCarrinho]);

  return {
    cartItems,
    loading,
    total,
    erro,
    addToCart,
    addingToCart,
    successAnimation,
    resetSuccess,
    removerItem,
    atualizarQuantidade,
  };
}
