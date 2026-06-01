import { Plus, Minus } from "lucide-react";


export default function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-[1rem] border border-orange-200 bg-orange-50/60 px-[1rem] py-[0.85rem]">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-zinc-500">
        Quantidade
      </span>
      <div className="flex items-center gap-[0.65rem]">
        <button
          onClick={() => onChange((prev) => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
          aria-label="Diminuir quantidade"
          className="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-[0.75rem] border border-orange-200 bg-white text-zinc-600 transition-colors hover:text-brand-700 disabled:pointer-events-none disabled:opacity-35 cursor-pointer"
        >
          <Minus className="h-[0.9rem] w-[0.9rem]" />
        </button>
        <span className="w-[1.8rem] text-center text-[1.05rem] font-bold tabular-nums text-zinc-900">
          {quantity}
        </span>
        <button
          onClick={() => onChange((prev) => prev + 1)}
          aria-label="Aumentar quantidade"
          className="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-[0.75rem] border border-orange-200 bg-white text-zinc-600 transition-colors hover:text-brand-700 cursor-pointer"
        >
          <Plus className="h-[0.9rem] w-[0.9rem]" />
        </button>
      </div>
    </div>
  );
}