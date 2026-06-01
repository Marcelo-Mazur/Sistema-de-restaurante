import { Loader2 } from "lucide-react";

export default function PagamentoResumo({
    formasPagamento,
    formaPagamento,
    onFormaPagamentoChange,
    totalItens,
    total,
    finalizando,
    checkoutDisabled,
    onFinalizar,
}) {
    return (
        <aside className="sticky top-[1rem] h-fit rounded-[1.5rem] border border-orange-200 bg-white/90 p-[1.2rem] shadow-[0_1rem_1.8rem_rgba(194,65,12,0.13)]">
            <h2 className="mb-[0.95rem] text-[1.2rem] font-bold text-zinc-900">Pagamento</h2>

            <div className="mb-[1rem] space-y-[0.55rem]">
                {formasPagamento.map((forma) => {
                    const Icone = forma.icone;
                    const selecionada = forma.id === formaPagamento;

                    return (
                        <label
                            key={forma.id}
                            className={`flex cursor-pointer items-center gap-[0.65rem] rounded-[0.9rem] border p-[0.65rem] transition-all ${
                                selecionada
                                    ? "border-brand-500 bg-brand-50"
                                    : "border-orange-200 bg-white hover:border-brand-300"
                            }`}
                        >
                            <input
                                type="radio"
                                name="formaPagamento"
                                value={forma.id}
                                checked={selecionada}
                                onChange={() => onFormaPagamentoChange(forma.id)}
                                className="accent-brand-600"
                            />
                            <Icone className="h-[1rem] w-[1rem] text-zinc-700" />
                            <div>
                                <p className="text-[0.78rem] font-bold text-zinc-800">{forma.titulo}</p>
                                <p className="text-[0.72rem] text-zinc-600">{forma.descricao}</p>
                            </div>
                        </label>
                    );
                })}
            </div>

            <div className="mb-[1rem] space-y-[0.6rem] border-t border-orange-200 pt-[0.8rem]">
                <div className="flex justify-between text-[0.83rem] text-zinc-600">
                    <span>Itens</span>
                    <span>{totalItens}</span>
                </div>
                <div className="flex justify-between text-[0.83rem] text-zinc-600">
                    <span>Entrega</span>
                    <span className="text-emerald-700">Gratis</span>
                </div>
                <div className="flex items-center justify-between pt-[0.2rem]">
                    <span className="font-bold text-zinc-900">Total</span>
                    <span className="text-[1.85rem] font-bold text-brand-700">R$ {total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={onFinalizar}
                disabled={finalizando || checkoutDisabled}
                className="flex h-[3rem] w-full items-center justify-center gap-[0.45rem] rounded-[0.95rem] bg-brand-600 text-[0.88rem] font-bold text-white transition-all hover:-translate-y-[0.04rem] hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 cursor-pointer"
            >
                {finalizando ? (
                    <>
                        <Loader2 className="h-[0.95rem] w-[0.95rem] animate-spin" />
                        Processando pagamento...
                    </>
                ) : (
                    "Confirmar e pagar"
                )}
            </button>
        </aside>
    );
}
