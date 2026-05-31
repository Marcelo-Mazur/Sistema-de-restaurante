import { Plus, Minus } from "lucide-react";


export default function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-2xl px-5 py-4">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Quantidade
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange((prev) => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
          aria-label="Diminuir quantidade"
          className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-lg font-bold text-white w-7 text-center tabular-nums">
          {quantity}
        </span>
        <button
          onClick={() => onChange((prev) => prev + 1)}
          aria-label="Aumentar quantidade"
          className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}