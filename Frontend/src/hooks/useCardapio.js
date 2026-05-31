import { useState, useEffect, useCallback } from "react";
import api from "../services/api";


export function useCardapio(showNotification) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCardapio = useCallback(async () => {
    try {
      const response = await api.get("api/cardapio");
      setItems(response.data);
    } catch {
      showNotification(
        "Não foi possível carregar o cardápio. Tente novamente.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchCardapio();
  }, [fetchCardapio]);

  return { items, loading };
}