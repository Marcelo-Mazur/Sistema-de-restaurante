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

export default function PedidoCard({ pedido }) {
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
