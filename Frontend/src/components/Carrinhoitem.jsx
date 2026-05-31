import { Plus, Minus, Trash2 } from "lucide-react";

export default function CarrinhoItem({ item, onAtualizar, onRemover }) {
  const nome  = item.cardapio?.nome || item.nome || "Item Indisponível";
  const preco = item.cardapio?.preco || item.preco || item.precoUnitario || 0;
  const id    = item.id || item.cardapioId;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors gap-4">

      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">{nome}</h3>
          <span className="text-sm text-slate-400">
            Valor unitário: R$ {preco.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 w-fit p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onAtualizar(id, item.quantidade, -1)}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-6 text-center text-sm font-bold text-slate-200">
            {item.quantidade}
          </span>
          <button
            onClick={() => onAtualizar(id, item.quantidade, 1)}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t border-slate-800/50 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-500 font-medium mb-1 hidden sm:block">
            Subtotal do item
          </span>
          <span className="text-xl font-bold text-amber-400">
            R$ {(preco * item.quantidade).toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => onRemover(id)}
          title="Remover item"
          className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}