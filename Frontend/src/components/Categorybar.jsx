import { useRef } from "react";
import { CATEGORIES } from "../constants/categories";


export default function CategoryBar({ selectedCategory, onSelect }) {
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className="hide -mx-[0.25rem] flex gap-[0.55rem] overflow-x-auto px-[0.25rem] pb-[0.2rem] [scrollbar-width:none] [-ms-overflow-style:none]"
    >
      {CATEGORIES.map(({ id, name, Icon }) => {
        const active = selectedCategory === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`
              inline-flex h-[2.4rem] items-center gap-[0.45rem] rounded-[0.85rem]
              whitespace-nowrap shrink-0 border px-[0.9rem] text-[0.78rem] font-semibold
              tracking-[0.01em] transition-all duration-200 cursor-pointer
              ${active
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-orange-200/90 bg-white text-zinc-700 hover:-translate-y-[0.04rem] hover:border-brand-300 hover:bg-brand-50"
              }
            `}
          >
            <Icon className="h-[0.9rem] w-[0.9rem]" />
            <span className="hidden sm:inline">{name}</span>
            <span className="sm:hidden">{name.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}