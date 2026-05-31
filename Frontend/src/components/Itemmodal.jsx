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

  // Bloqueia scroll do body enquanto o modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel — bottom-sheet no mobile, modal centralizado no sm+ */}
      <div className="relative w-full sm:max-w-md bg-slate-900 sm:rounded-3xl rounded-t-3xl border border-slate-800 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh]">

        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-5 top-5 z-20 p-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Alça de arrasto (apenas mobile) */}
        <div className="sm:hidden flex justify-center pt-4 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-700" />
        </div>

        {/* Hero com ícone */}
        <div
          className={`relative bg-gradient-to-br ${style.bg} flex items-center justify-center shrink-0`}
          style={{ minHeight: "220px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </div>
          <ModalIcon className={`w-32 h-32 ${style.text} relative z-10 drop-shadow-2xl`} />
          <span className={`absolute bottom-4 left-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border backdrop-blur-sm ${style.badge}`}>
            {getCategoryName(categoryId)}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col flex-1 p-6 sm:p-8 overflow-y-auto gap-5">
          <div>
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
              {item.nome}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.descricao || `Nossa versão exclusiva de ${item.nome}. Preparado com maestria pela nossa cozinha.`}
            </p>
          </div>

          <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">
                Total
              </p>
              <p className="text-2xl font-extrabold text-amber-400 leading-none">
                R$ {(item.preco * quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => onAddToCart(item, quantity)}
              disabled={addingToCart || successAnimation}
              className={`
                flex-1 py-4 px-5 rounded-2xl font-bold text-sm tracking-wide
                flex items-center justify-center gap-2
                transition-all cursor-pointer border
                ${successAnimation
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                  : "bg-red-600 hover:bg-red-500 active:scale-95 text-white border-red-500 shadow-lg shadow-red-900/20"
                }
              `}
            >
              {successAnimation ? (
                <><Check className="w-4 h-4" /> Adicionado!</>
              ) : addingToCart ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
              ) : (
                <><ShoppingBag className="w-4 h-4" /> Adicionar ao carrinho</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}