import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export function useCart(showNotification) {
  const navigate = useNavigate();

  const [addingToCart, setAddingToCart] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const resetSuccess = useCallback(() => {
    setSuccessAnimation(false);
  }, []);

  const addToCart = useCallback(
    async (item, quantity = 1, onSuccess) => {
      const userId = localStorage.getItem("usuarioId");
      const token = localStorage.getItem("tokenSessao");

      if (!token || !userId) {
        navigate("/login");
        return;
      }

      try {
        setAddingToCart(true);

        await api.post(`api/pedidos/carrinho/${userId}`, {
          cardapioId: item.id,
          quantidade: quantity,
        });

        setSuccessAnimation(true);
        showNotification(`${item.nome} adicionado ao carrinho!`, "success");

        setTimeout(() => {
          setSuccessAnimation(false);
          window.dispatchEvent(new Event("cartUpdated"));
          onSuccess?.();
        }, 1200);
      } catch {
        showNotification(
          "Não foi possível adicionar o item. Tente novamente.",
          "error"
        );
      } finally {
        setAddingToCart(false);
      }
    },
    [navigate, showNotification]
  );

  return { addToCart, addingToCart, successAnimation, resetSuccess };
}