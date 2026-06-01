import { useEffect } from "react";
import { X, ShoppingBag, Check, Loader2 } from "lucide-react";
import { getCategoryStyle, getCategoryName } from "../constants/categories";
import QuantitySelector from "./Quantityselector";


export default function ItemModal({
  item,
  quantity,
  onQuantityChange,
  onClose,
  onAddToCart,
  addingToCart,
  successAnimation,
}) {
  const { categoryId, style } = getCategoryStyle(item);
  const ModalIcon = style.Icon;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

      <div
        className="absolute inset-0 bg-zinc-900/45 backdrop-blur-[0.18rem]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.6rem] border border-orange-200 bg-white sm:max-h-[88vh] sm:max-w-[26rem] sm:rounded-[1.6rem] sm:shadow-warm">
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-[1rem] top-[1rem] z-20 rounded-full border border-orange-200 bg-white/90 p-[0.55rem] text-zinc-500 backdrop-blur-sm transition-colors hover:text-zinc-800 cursor-pointer"
        >
          <X className="h-[0.9rem] w-[0.9rem]" />
        </button>

        <div className="shrink-0 pb-[0.4rem] pt-[0.8rem] sm:hidden flex justify-center">
          <div className="h-[0.2rem] w-[2.5rem] rounded-full bg-zinc-300" />
        </div>

        <div
          className={`relative flex min-h-[13.75rem] shrink-0 items-center justify-center bg-gradient-to-br ${style.bg}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[12rem] w-[12rem] rounded-full bg-white/20 blur-3xl" />
          </div>
          <ModalIcon className={`relative z-10 h-[7.4rem] w-[7.4rem] ${style.text} drop-shadow-2xl`} />
          <span className={`absolute bottom-[0.9rem] left-[1rem] inline-flex items-center gap-[0.35rem] rounded-full border px-[0.75rem] py-[0.35rem] text-[0.63rem] font-bold uppercase tracking-[0.09em] backdrop-blur-sm ${style.badge}`}>
            {getCategoryName(categoryId)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-[1.1rem] overflow-y-auto p-[1.25rem] sm:p-[1.6rem]">
          <div>
            <h2 className="mb-[0.45rem] text-[1.7rem] font-extrabold leading-tight text-zinc-900">
              {item.nome}
            </h2>
            <p className="text-[0.86rem] leading-relaxed text-zinc-600">
              {item.descricao || `Nossa versão exclusiva de ${item.nome}. Preparado com maestria pela nossa cozinha.`}
            </p>
          </div>

          <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

          <div className="flex items-center justify-between gap-[0.8rem]">
            <div>
              <p className="mb-[0.2rem] text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-zinc-500">
                Total
              </p>
              <p className="text-[1.7rem] font-extrabold leading-none text-brand-700">
                R$ {(item.preco * quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => onAddToCart(item, quantity)}
              disabled={addingToCart || successAnimation}
              className={`
                flex-1 rounded-[1rem] border px-[1rem] py-[0.9rem] text-[0.85rem] font-bold tracking-wide
                flex items-center justify-center gap-2
                transition-all cursor-pointer border
                ${successAnimation
                  ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                  : "border-brand-600 bg-brand-600 text-white shadow-[0_0.8rem_1.6rem_rgba(185,71,15,0.26)] hover:bg-brand-700 active:scale-95"
                }
              `}
            >
              {successAnimation ? (
                <><Check className="h-[0.9rem] w-[0.9rem]" /> Adicionado!</>
              ) : addingToCart ? (
                <><Loader2 className="h-[0.9rem] w-[0.9rem] animate-spin" /> Processando...</>
              ) : (
                <><ShoppingBag className="h-[0.9rem] w-[0.9rem]" /> Adicionar ao carrinho</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}