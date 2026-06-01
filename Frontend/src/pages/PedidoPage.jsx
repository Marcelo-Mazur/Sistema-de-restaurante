import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AlertCircle,
    ChefHat,
    Loader2,
    ReceiptText,
    RefreshCcw,
} from "lucide-react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import api from "../services/api";

const PEDIDO_STATUS = {
    0: { label: "Aberto", color: "bg-zinc-100 text-zinc-700 border-zinc-200" },
    1: { label: "Em preparo", color: "bg-amber-100 text-amber-700 border-amber-300" },
    2: { label: "Pronto", color: "bg-sky-100 text-sky-700 border-sky-300" },
    3: { label: "Entregue", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
    4: { label: "Cancelado", color: "bg-red-100 text-red-700 border-red-300" },
};

const PAGAMENTO_STATUS = {
    0: "Pendente",
    1: "Pago",
    2: "Cancelado",
};

const PAGAMENTO_FORMA = {
    0: "Dinheiro",
    1: "Cartao",
    2: "Pix",
};

export default function Pedido() {
    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const totalPedidos = useMemo(() => pedidos.length, [pedidos]);

    useEffect(() => {
        carregarPedidos();
    }, [navigate]);

    async function carregarPedidos() {
        const userId = localStorage.getItem("usuarioId");
        const token = localStorage.getItem("tokenSessao");

        if (!token || !userId) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            setErro("");

            const response = await api.get(`api/pedidos/usuario/${userId}`);
            const lista = Array.isArray(response.data) ? response.data : [];
            const ordenados = [...lista].sort((a, b) => {
                const dataA = new Date(a.dataCriacao || a.DataCriacao || 0).getTime();
                const dataB = new Date(b.dataCriacao || b.DataCriacao || 0).getTime();
                return dataB - dataA;
            });

            setPedidos(ordenados);
        } catch {
            setErro("Nao foi possivel carregar seus pedidos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col text-zinc-900">
            <Header />
            <NavBar />

            <main className="mx-auto w-full max-w-[78rem] flex-1 px-[1rem] py-[1.3rem] sm:px-[1.5rem] lg:px-[2rem] lg:py-[1.75rem]">
                <div className="mb-[1.2rem] flex flex-wrap items-center justify-between gap-[0.75rem]">
                    <div className="flex items-center gap-[0.65rem]">
                        <span className="inline-flex h-[2.45rem] w-[2.45rem] items-center justify-center rounded-[0.85rem] bg-brand-600 text-white shadow-[0_0.75rem_1.5rem_rgba(185,71,15,0.26)]">
                            <ReceiptText className="h-[1.1rem] w-[1.1rem]" />
                        </span>
                        <div>
                            <h1 className="font-brand text-[2rem] leading-none text-zinc-900">Meus Pedidos</h1>
                            <p className="mt-[0.1rem] text-[0.78rem] text-zinc-600">
                                {totalPedidos} {totalPedidos === 1 ? "pedido" : "pedidos"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={carregarPedidos}
                        className="inline-flex h-[2.65rem] items-center gap-[0.45rem] rounded-[0.85rem] border border-orange-200 bg-white px-[0.9rem] text-[0.82rem] font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 cursor-pointer"
                    >
                        <RefreshCcw className="h-[0.85rem] w-[0.85rem]" />
                        Atualizar
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-[0.75rem] py-[4.5rem]">
                        <Loader2 className="h-[2.2rem] w-[2.2rem] animate-spin text-brand-600" />
                        <p className="text-[0.86rem] font-medium text-zinc-600">Carregando seus pedidos...</p>
                    </div>
                ) : erro ? (
                    <div className="mb-[1rem] flex flex-wrap items-center justify-between gap-[0.55rem] rounded-[0.95rem] border border-red-300 bg-red-50 px-[0.9rem] py-[0.75rem] text-red-700">
                        <div className="flex items-center gap-[0.55rem]">
                            <AlertCircle className="h-[1rem] w-[1rem] shrink-0" />
                            <p className="text-[0.82rem] font-medium">{erro}</p>
                        </div>
                        <button
                            onClick={carregarPedidos}
                            className="h-[2.2rem] rounded-[0.75rem] border border-red-300 px-[0.65rem] text-[0.75rem] font-semibold transition-colors hover:bg-red-100 cursor-pointer"
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : pedidos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-[1.6rem] border border-orange-200 bg-white/88 p-[1.4rem] py-[3.2rem] text-center shadow-[0_1rem_2rem_rgba(194,65,12,0.12)]">
                        <div className="mb-[0.9rem] flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-full bg-orange-100/70">
                            <ChefHat className="h-[2.2rem] w-[2.2rem] text-brand-500" />
                        </div>
                        <h2 className="mb-[0.4rem] text-[1.55rem] font-bold text-zinc-900">Voce ainda nao fez pedidos</h2>
                        <p className="mb-[1.2rem] max-w-[24rem] text-[0.86rem] text-zinc-600">
                            Escolha seus itens no cardapio e finalize o checkout para acompanhar aqui.
                        </p>
                        <button
                            onClick={() => navigate("/cardapio")}
                            className="inline-flex h-[3rem] items-center justify-center rounded-[0.95rem] bg-brand-600 px-[1.2rem] text-[0.86rem] font-bold text-white transition-all hover:-translate-y-[0.04rem] hover:bg-brand-700 cursor-pointer"
                        >
                            Ir para o cardapio
                        </button>
                    </div>
                ) : (
                    <section className="flex flex-col gap-[0.8rem]">
                        {pedidos.map((pedido) => {
                            const itens = pedido.itens || pedido.Itens || [];
                            const pagamento = pedido.pagamento || pedido.Pagamento;
                            const total = itens.reduce((acc, item) => {
                                const preco = Number(item.precoUnitario ?? item.cardapio?.preco ?? 0);
                                const quantidade = Number(item.quantidade ?? 0);
                                return acc + preco * quantidade;
                            }, 0);

                            const statusPedido = getPedidoStatusInfo(pedido.status ?? pedido.Status);
                            const formaPagamento = getFormaPagamentoLabel(pagamento?.forma ?? pagamento?.Forma);
                            const statusPagamento = getStatusPagamentoLabel(pagamento?.status ?? pagamento?.Status);
                            const dataCriacao = formatarDataHora(pedido.dataCriacao ?? pedido.DataCriacao);

                            return (
                                <article
                                    key={pedido.id || pedido.Id}
                                    className="rounded-[1.35rem] border border-orange-200 bg-white/92 p-[1rem] shadow-[0_0.8rem_1.6rem_rgba(194,65,12,0.1)]"
                                >
                                    <header className="mb-[0.8rem] flex flex-wrap items-start justify-between gap-[0.65rem] border-b border-orange-200 pb-[0.8rem]">
                                        <div>
                                            <h3 className="text-[1rem] font-bold text-zinc-900">Pedido #{pedido.id || pedido.Id}</h3>
                                            <p className="mt-[0.12rem] text-[0.74rem] text-zinc-600">Criado em {dataCriacao}</p>
                                        </div>
                                        <span
                                            className={`rounded-full border px-[0.65rem] py-[0.32rem] text-[0.68rem] font-semibold ${statusPedido.color}`}
                                        >
                                            {statusPedido.label}
                                        </span>
                                    </header>

                                    <div className="space-y-[0.35rem]">
                                        {itens.map((item) => {
                                            const nome = item.cardapio?.nome || item.nome || "Item";
                                            const quantidade = Number(item.quantidade ?? 0);
                                            const preco = Number(item.precoUnitario ?? item.cardapio?.preco ?? 0);

                                            return (
                                                <div
                                                    key={item.id || `${pedido.id || pedido.Id}-${item.cardapioId}`}
                                                    className="flex items-center justify-between text-[0.82rem] text-zinc-700"
                                                >
                                                    <span>
                                                        {quantidade}x {nome}
                                                    </span>
                                                    <span>R$ {(preco * quantidade).toFixed(2)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <footer className="mt-[0.9rem] flex flex-wrap items-center justify-between gap-[0.55rem] border-t border-orange-200 pt-[0.75rem]">
                                        <div className="text-[0.78rem] text-zinc-600">
                                            Pagamento: <span className="text-zinc-800">{formaPagamento}</span>
                                            {pagamento && (
                                                <>
                                                    <span className="text-zinc-500"> ({statusPagamento})</span>
                                                </>
                                            )}
                                        </div>
                                        <strong className="text-[1.35rem] text-brand-700">R$ {total.toFixed(2)}</strong>
                                    </footer>
                                </article>
                            );
                        })}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}

function getPedidoStatusInfo(value) {
    if (typeof value === "number" && PEDIDO_STATUS[value]) {
        return PEDIDO_STATUS[value];
    }

    const texto = String(value || "").replaceAll(" ", "").toLowerCase();
    if (texto === "aberto") return PEDIDO_STATUS[0];
    if (texto === "empreparo") return PEDIDO_STATUS[1];
    if (texto === "pronto") return PEDIDO_STATUS[2];
    if (texto === "entregue") return PEDIDO_STATUS[3];
    if (texto === "cancelado") return PEDIDO_STATUS[4];

    return PEDIDO_STATUS[0];
}

function getFormaPagamentoLabel(value) {
    if (typeof value === "number") {
        return PAGAMENTO_FORMA[value] || "Nao informado";
    }

    const texto = String(value || "").toLowerCase();
    if (texto === "dinheiro") return "Dinheiro";
    if (texto === "cartao") return "Cartao";
    if (texto === "pix") return "Pix";
    return "Nao informado";
}

function getStatusPagamentoLabel(value) {
    if (typeof value === "number") {
        return PAGAMENTO_STATUS[value] || "Nao informado";
    }

    const texto = String(value || "").toLowerCase();
    if (texto === "pendente") return "Pendente";
    if (texto === "pago") return "Pago";
    if (texto === "cancelado") return "Cancelado";
    return "Nao informado";
}

function formatarDataHora(value) {
    if (!value) return "data indisponivel";

    const data = new Date(value);
    if (Number.isNaN(data.getTime())) return "data indisponivel";

    return data.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
}