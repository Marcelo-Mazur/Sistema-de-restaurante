import { Plus } from "lucide-react";
import { getCategoryStyle, getCategoryName } from "../constants/categories";


export default function MenuCard({ item, onOpen, onQuickAdd }) {
  const { categoryId, style } = getCategoryStyle(item);
  const ItemIcon = style.Icon;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[1.4rem] border border-orange-200/80 bg-white/92 shadow-[0_0.9rem_1.8rem_rgba(194,65,12,0.12)] transition-all duration-300 hover:-translate-y-[0.08rem] hover:border-brand-300 hover:shadow-[0_1.05rem_2rem_rgba(194,65,12,0.2)]">

      {/* Área da imagem / ícone */}
      <div
        onClick={() => onOpen(item)}
        className={`relative flex cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br ${style.bg} pt-[85%]`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_45%,rgba(0,0,0,0.12)_100%)]">
          <div className="absolute h-[8rem] w-[8rem] rounded-full bg-white/25 blur-3xl" />
          <ItemIcon
            className={`relative z-10 h-[4.8rem] w-[4.8rem] ${style.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 sm:h-[5.6rem] sm:w-[5.6rem]`}
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-end justify-center bg-gradient-to-t from-zinc-900/45 via-transparent to-transparent pb-[0.8rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/45 bg-white/20 px-[0.7rem] py-[0.3rem] text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            Ver detalhes
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="flex flex-1 flex-col p-[1rem] sm:p-[1.2rem]">
        <span className={`mb-[0.75rem] inline-flex w-fit items-center gap-[0.3rem] rounded-[0.6rem] border px-[0.55rem] py-[0.35rem] text-[0.62rem] font-bold uppercase tracking-[0.09em] ${style.badge}`}>
          {getCategoryName(categoryId)}
        </span>

        <div onClick={() => onOpen(item)} className="cursor-pointer flex-1">
          <h3 className="mb-[0.4rem] line-clamp-1 text-[0.92rem] font-bold leading-tight text-zinc-900 transition-colors group-hover:text-brand-700">
            {item.nome}
          </h3>
          <p className="line-clamp-2 text-[0.73rem] leading-relaxed text-zinc-600">
            {item.descricao || `Delicioso ${item.nome?.toLowerCase()} preparado na hora.`}
          </p>
        </div>

        <div className="mt-[0.9rem] flex items-center justify-between gap-[0.5rem] border-t border-orange-200/75 pt-[0.75rem]">
          <div className="flex flex-col">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-zinc-500">Preco</span>
            <span className="text-[1rem] font-extrabold leading-tight text-brand-700">
              R$ {item.preco.toFixed(2)}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onQuickAdd(item); }}
            aria-label={`Adicionar ${item.nome} ao carrinho`}
            className="flex h-[2.35rem] w-[2.35rem] items-center justify-center rounded-[0.8rem] border border-orange-200 bg-white text-brand-600 shadow-sm transition-all duration-200 hover:-translate-y-[0.03rem] hover:border-brand-500 hover:bg-brand-600 hover:text-white active:scale-95 cursor-pointer"
          >
            <Plus className="h-[0.95rem] w-[0.95rem]" />
          </button>
        </div>
      </div>
    </div>
  );
}