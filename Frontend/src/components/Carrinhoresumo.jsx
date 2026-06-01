import { ArrowRight } from "lucide-react";

export default function CarrinhoResumo({
  total,
  onCheckout,
  checkoutDisabled = false,
  checkoutLabel = "Ir para checkout",
}) {
  return (
    <div className="sticky top-[1rem] h-fit rounded-[1.5rem] border border-orange-200 bg-white/90 p-[1.2rem] shadow-[0_1rem_1.8rem_rgba(194,65,12,0.13)]">
      <h2 className="mb-[1rem] border-b border-orange-200 pb-[0.8rem] text-[1.2rem] font-bold text-zinc-900">
        Resumo do Pedido
      </h2>

      <div className="mb-[0.65rem] flex items-center justify-between text-[0.86rem] text-zinc-700">
        <span>Subtotal</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      <div className="mb-[1rem] flex items-center justify-between text-[0.86rem] text-zinc-700">
        <span>Taxa de Entrega</span>
        <span className="font-medium text-emerald-700">Gratis</span>
      </div>

      <div className="mb-[1.2rem] flex items-center justify-between border-t border-orange-200 pt-[0.8rem]">
        <span className="text-[0.95rem] font-bold text-zinc-900">Total</span>
        <span className="text-[1.85rem] font-bold text-brand-700">
          R$ {total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onCheckout}
        disabled={checkoutDisabled}
        className="flex h-[3rem] w-full items-center justify-center gap-[0.4rem] rounded-[0.95rem] bg-brand-600 text-[0.88rem] font-bold text-white transition-all hover:-translate-y-[0.04rem] hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:active:scale-100 cursor-pointer"
      >
        {checkoutLabel}
        <ArrowRight className="h-[0.95rem] w-[0.95rem]" />
      </button>
    </div>
  );
}