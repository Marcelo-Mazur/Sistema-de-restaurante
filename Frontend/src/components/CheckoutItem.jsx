export default function CheckoutItem({ item }) {
    const nome = item.cardapio?.nome || item.nome || "Item";
    const preco = Number(item.cardapio?.preco ?? item.preco ?? item.precoUnitario ?? 0);
    const quantidade = Number(item.quantidade ?? 0);

    return (
        <article
            className="flex items-center justify-between gap-[0.75rem] rounded-[1.15rem] border border-orange-200 bg-white/92 p-[0.95rem] shadow-[0_0.75rem_1.4rem_rgba(194,65,12,0.1)]"
        >
            <div>
                <h3 className="font-bold text-zinc-900">{nome}</h3>
                <p className="mt-[0.15rem] text-[0.78rem] text-zinc-600">
                    {quantidade} x R$ {preco.toFixed(2)}
                </p>
            </div>
            <strong className="text-[1.1rem] text-brand-700">
                R$ {(preco * quantidade).toFixed(2)}
            </strong>
        </article>
    );
}
