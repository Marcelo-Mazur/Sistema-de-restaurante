import { useRef } from "react";
import { CATEGORIES } from "../constants/categories";


export default function CategoryBar({ selectedCategory, onSelect }) {
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {CATEGORIES.map(({ id, name, Icon }) => {
        const active = selectedCategory === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
              whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer
              ${active
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-[1.03]"
                : "bg-slate-800/70 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/70 hover:border-slate-600"
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{name}</span>
            <span className="sm:hidden">{name.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}