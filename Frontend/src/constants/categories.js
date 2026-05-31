import {
  UtensilsCrossed,
  Beef,
  CupSoda,
  CakeSlice,
  Soup,
  FishSymbol,
  Pizza,
} from "lucide-react";

export const CATEGORIES = [
  { id: "all", name: "Todos",           Icon: UtensilsCrossed },
  { id: 0,     name: "Lanches",         Icon: Beef },
  { id: 1,     name: "Bebidas",         Icon: CupSoda },
  { id: 2,     name: "Sobremesas",      Icon: CakeSlice },
  { id: 3,     name: "Pratos",          Icon: Soup },
  { id: 4,     name: "Acompanhamentos", Icon: FishSymbol },
  { id: 5,     name: "Outros",          Icon: Pizza },
];

export const CATEGORY_STYLES = {
  0: { bg: "from-amber-500/20 to-orange-600/20", border: "border-orange-500/30",  text: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",  Icon: Beef },
  1: { bg: "from-blue-500/20 to-indigo-600/20",  border: "border-blue-500/30",    text: "text-blue-400",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",    Icon: CupSoda },
  2: { bg: "from-pink-500/20 to-purple-600/20",  border: "border-pink-500/30",    text: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",    Icon: CakeSlice },
  3: { bg: "from-emerald-500/20 to-teal-600/20", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", Icon: Soup },
  4: { bg: "from-yellow-500/20 to-amber-600/20", border: "border-yellow-500/30",  text: "text-yellow-400",  badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",  Icon: FishSymbol },
  5: { bg: "from-rose-500/20 to-red-600/20",     border: "border-rose-500/30",    text: "text-rose-400",    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",    Icon: Pizza },
};

const CATEGORY_MATCH = {
  lanche: 0,        lanches: 0,
  bebida: 1,        bebidas: 1,
  sobremesa: 2,     sobremesas: 2,
  prato: 3,         pratos: 3,
  acompanhamento: 4, acompanhamentos: 4,
  outro: 5,         outros: 5,
};

export function resolveCategoryId(categoria) {
  if (typeof categoria === "number") return categoria;
  return CATEGORY_MATCH[String(categoria).toLowerCase()] ?? 5;
}

export function getCategoryStyle(item) {
  const categoryId = resolveCategoryId(item.categoria);
  const style = CATEGORY_STYLES[categoryId] ?? CATEGORY_STYLES[5];
  return { categoryId, style };
}

export function getCategoryName(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.name ?? "Outros";
}