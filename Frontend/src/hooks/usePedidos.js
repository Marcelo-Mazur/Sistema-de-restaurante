import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "./useAuth";

function ordenarPedidosPorData(lista) {
  return [...lista].sort((a, b) => {
    const dataA = new Date(a.dataCriacao || a.DataCriacao || 0).getTime();
    const dataB = new Date(b.dataCriacao || b.DataCriacao || 0).getTime();
    return dataB - dataA;
  });
}

export function usePedidos() {
  const { requireAuth } = useAuth();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const totalPedidos = useMemo(() => pedidos.length, [pedidos]);

  const carregarPedidos = useCallback(async () => {
    const session = requireAuth();

    if (!session) {
      return;
    }

    try {
      setLoading(true);
      setErro("");

      const response = await api.get(`api/pedidos/usuario/${session.usuarioId}`);
      const lista = Array.isArray(response.data) ? response.data : [];
      setPedidos(ordenarPedidosPorData(lista));
    } catch {
      setErro("Nao foi possivel carregar seus pedidos.");
    } finally {
      setLoading(false);
    }
  }, [requireAuth]);

  useEffect(() => {
    queueMicrotask(() => carregarPedidos());
  }, [carregarPedidos]);

  return {
    pedidos,
    loading,
    erro,
    totalPedidos,
    carregarPedidos,
  };
}
