import { Plus } from "lucide-react";
import { getCategoryStyle, getCategoryName } from "../constants/categories";


export default function MenuCard({ item, onOpen, onQuickAdd }) {
  const { categoryId, style } = getCategoryStyle(item);
  const ItemIcon = style.Icon;

  return (
    <div className="group relative bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5">

      {/* Área da imagem / ícone */}
      <div
        onClick={() => onOpen(item)}
        className={`relative cursor-pointer bg-gradient-to-br ${style.bg} flex items-center justify-center overflow-hidden`}
        style={{ paddingBottom: "85%" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full blur-3xl opacity-30 bg-white/20" />
          <ItemIcon
            className={`w-20 h-20 sm:w-24 sm:h-24 ${style.text} relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 z-20">
          <span className="text-[10px] font-bold tracking-widest text-white bg-red-600/90 py-1 px-3 rounded-full uppercase border border-red-500/50 backdrop-blur-sm">
            Ver detalhes
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <span className={`self-start inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border mb-3.5 ${style.badge}`}>
          {getCategoryName(categoryId)}
        </span>

        <div onClick={() => onOpen(item)} className="cursor-pointer flex-1">
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-1 mb-2 leading-tight">
            {item.nome}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
            {item.descricao || `Delicioso ${item.nome?.toLowerCase()} preparado na hora.`}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-slate-800/60">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-600 font-medium">Preço</span>
            <span className="text-base font-extrabold text-amber-400 leading-tight">
              R$ {item.preco.toFixed(2)}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onQuickAdd(item); }}
            aria-label={`Adicionar ${item.nome} ao carrinho`}
            className="flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-red-600 active:scale-90 text-slate-300 hover:text-white rounded-xl border border-slate-700 hover:border-red-500 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}