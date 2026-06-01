import { Plus, Minus, Trash2 } from "lucide-react";

export default function CarrinhoItem({ item, onAtualizar, onRemover }) {
  const nome  = item.cardapio?.nome || item.nome || "Item Indisponível";
  const preco = item.cardapio?.preco || item.preco || item.precoUnitario || 0;
  const id    = item.id || item.cardapioId;

  return (
    <div className="flex flex-col justify-between gap-[0.9rem] rounded-[1.25rem] border border-orange-200 bg-white/92 p-[1rem] shadow-[0_0.8rem_1.65rem_rgba(194,65,12,0.1)] transition-colors hover:border-brand-300 sm:flex-row sm:items-center">

      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-[1.05rem] font-bold text-zinc-900">{nome}</h3>
          <span className="text-[0.78rem] text-zinc-600">
            Valor unitário: R$ {preco.toFixed(2)}
          </span>
        </div>

        <div className="flex w-fit items-center gap-[0.5rem] rounded-[0.85rem] border border-orange-200 bg-orange-50/60 p-[0.3rem]">
          <button
            onClick={() => onAtualizar(id, item.quantidade, -1)}
            className="rounded-[0.65rem] border border-orange-200 bg-white p-[0.42rem] text-zinc-600 transition-colors hover:text-brand-700 cursor-pointer"
          >
            <Minus className="h-[0.8rem] w-[0.8rem]" />
          </button>
          <span className="w-[1.6rem] text-center text-[0.86rem] font-bold text-zinc-800">
            {item.quantidade}
          </span>
          <button
            onClick={() => onAtualizar(id, item.quantidade, 1)}
            className="rounded-[0.65rem] border border-orange-200 bg-white p-[0.42rem] text-zinc-600 transition-colors hover:text-brand-700 cursor-pointer"
          >
            <Plus className="h-[0.8rem] w-[0.8rem]" />
          </button>
        </div>
      </div>

      <div className="mt-[0.2rem] flex w-full items-center justify-between gap-[0.9rem] border-t border-orange-200/70 pt-[0.8rem] sm:mt-0 sm:w-auto sm:justify-end sm:border-0 sm:pt-0">
        <div className="flex flex-col items-end">
          <span className="mb-[0.2rem] hidden text-[0.65rem] font-medium uppercase tracking-[0.06em] text-zinc-500 sm:block">
            Subtotal do item
          </span>
          <span className="text-[1.3rem] font-bold text-brand-700">
            R$ {(preco * item.quantidade).toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => onRemover(id)}
          title="Remover item"
          className="rounded-[0.8rem] p-[0.52rem] text-zinc-500 transition-all hover:bg-red-50 hover:text-red-600 cursor-pointer"
        >
          <Trash2 className="h-[1rem] w-[1rem]" />
        </button>
      </div>
    </div>
  );
}