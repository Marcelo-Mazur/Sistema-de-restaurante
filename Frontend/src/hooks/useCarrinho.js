import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export function useCarrinho() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [total, setTotal]         = useState(0);
  const [erro, setErro]           = useState(null);

  const carregarCarrinho = useCallback(async (primeiroCarregamento = false) => {
    const userId = localStorage.getItem("usuarioId");
    const token  = localStorage.getItem("tokenSessao");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      if (primeiroCarregamento) setLoading(true);
      setErro(null);

      const response = await api.get(`api/pedidos/carrinho/${userId}`);
      const itens = response.data.itens || response.data.Itens || [];

      setCartItems(itens);
      setTotal(
        itens.reduce((acc, item) => {
          const preco = item.cardapio?.preco || item.preco || item.precoUnitario || 0;
          return acc + preco * item.quantidade;
        }, 0)
      );
    } catch {
      setErro("Não foi possível carregar os itens do carrinho.");
    } finally {
      if (primeiroCarregamento) setLoading(false);
    }
  }, [navigate]);

  async function removerItem(itemId) {
    try {
      setErro(null);
      await api.delete(`api/pedidos/carrinho/item/${itemId}`);
      carregarCarrinho();
    } catch {
      setErro("Não foi possível remover o item.");
    }
  }

  async function atualizarQuantidade(itemId, quantidadeAtual, mudanca) {
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
      setErro("Não foi possível atualizar a quantidade do item.");
    }
  }

  useEffect(() => {
    carregarCarrinho(true);
  }, [carregarCarrinho]);

  return { cartItems, loading, total, erro, removerItem, atualizarQuantidade };
}